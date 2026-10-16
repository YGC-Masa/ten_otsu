#!/usr/bin/env python3
"""Convert legacy image assets to WebP and relink textual references.

This script is intended for a history-free rebuild directory. PNG files are
encoded losslessly. JPEG files are encoded at quality 92. Existing WebP files
with the same stem are treated as canonical and are not overwritten.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


LEGACY_EXTENSIONS = {".png", ".jpg", ".jpeg"}


def convert_one(source: Path) -> tuple[Path, Path, bool]:
    target = source.with_suffix(".webp")
    created = not target.exists()
    if created:
        command = ["convert", str(source)]
        if source.suffix.lower() == ".png":
            command.extend(["-define", "webp:lossless=true", "-define", "webp:method=6"])
        else:
            command.extend(["-quality", "92", "-define", "webp:method=6"])
        command.append(str(target))
        subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    return source, target, created


def relink_text(root: Path, mapping: dict[Path, Path]) -> tuple[int, int]:
    basename_counts = Counter(source.name for source in mapping)
    replacements: list[tuple[str, str]] = []
    for source, target in mapping.items():
        old_root = source.relative_to(root).as_posix()
        new_root = target.relative_to(root).as_posix()
        replacements.append((old_root, new_root))
        if old_root.startswith("images/"):
            replacements.append((old_root.removeprefix("images/"), new_root.removeprefix("images/")))
        if basename_counts[source.name] == 1:
            replacements.append((source.name, target.name))

    changed_files = 0
    replacement_count = 0
    for path in root.rglob("*"):
        if not path.is_file() or path == root / "CHECKSUMS.json" or "images" in path.parts:
            continue
        try:
            original = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        updated = original
        for old, new in replacements:
            hits = updated.count(old)
            if hits:
                updated = updated.replace(old, new)
                replacement_count += hits
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed_files += 1
    return changed_files, replacement_count


def regenerate_checksums(root: Path) -> int:
    checksums: dict[str, str] = {}
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path == root / "CHECKSUMS.json" or ".git" in path.parts:
            continue
        digest = hashlib.sha256()
        with path.open("rb") as stream:
            for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                digest.update(chunk)
        checksums[path.relative_to(root).as_posix()] = digest.hexdigest()
    (root / "CHECKSUMS.json").write_text(
        json.dumps(checksums, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return len(checksums)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    parser.add_argument(
        "--legacy-tree",
        type=Path,
        help="Optional untouched tree used to repair references after legacy files are gone.",
    )
    parser.add_argument("--workers", type=int, default=max(1, min(6, os.cpu_count() or 1)))
    args = parser.parse_args()
    root = args.root.resolve()
    image_root = root / "images"
    sources = sorted(
        path for path in image_root.rglob("*")
        if path.is_file() and path.suffix.lower() in LEGACY_EXTENSIONS
    )
    before = sum(path.stat().st_size for path in sources)
    mapping: dict[Path, Path] = {}
    created_count = 0

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(convert_one, source): source for source in sources}
        for index, future in enumerate(as_completed(futures), 1):
            source, target, created = future.result()
            mapping[source] = target
            created_count += int(created)
            if index % 25 == 0 or index == len(sources):
                print(f"converted/resolved {index}/{len(sources)}", flush=True)

    converted_after = sum(target.stat().st_size for target in mapping.values())

    if args.legacy_tree:
        legacy_tree = args.legacy_tree.resolve()
        for legacy_source in (legacy_tree / "images").rglob("*"):
            if not legacy_source.is_file() or legacy_source.suffix.lower() not in LEGACY_EXTENSIONS:
                continue
            relative = legacy_source.relative_to(legacy_tree)
            rebuilt_source = root / relative
            rebuilt_target = rebuilt_source.with_suffix(".webp")
            if rebuilt_target.exists():
                mapping[rebuilt_source] = rebuilt_target

    changed_files, replacements = relink_text(root, mapping)
    for source in mapping:
        if source.exists():
            source.unlink()
    checksum_count = regenerate_checksums(root)

    print(f"legacy assets: {len(sources)}")
    print(f"new WebP files: {created_count}")
    print(f"relinked text files: {changed_files} ({replacements} replacements)")
    print(f"legacy bytes: {before}")
    print(f"WebP bytes: {converted_after}")
    print(f"saved bytes: {before - converted_after}")
    print(f"checksum entries: {checksum_count}")


if __name__ == "__main__":
    main()
