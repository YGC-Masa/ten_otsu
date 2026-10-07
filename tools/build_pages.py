"""Build a lossless WebP Pages artifact without modifying source assets."""
import concurrent.futures
import hashlib
import json
import re
import shutil
import subprocess
from collections import defaultdict
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_site"
REPORT = ROOT / "pages-build-report.json"
LIMIT = 1_000_000_000
TEXT = {".html", ".js", ".css", ".json", ".txt", ".md", ".tsv"}


def main():
    files = [ROOT / p for p in subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0") if p]
    # Permit locally prepared, not-yet-committed build files during validation.
    files = [p for p in files if p.is_file()]
    texts = {p: p.read_text(encoding="utf-8") for p in files if p.suffix in TEXT}
    candidates = [p for p in files if p.suffix.lower() == ".png"
                  and "images/assets/char/" not in p.relative_to(ROOT).as_posix()
                  and not p.with_suffix(".webp").exists()]
    names = defaultdict(list)
    for p in files:
        names[p.name].append(p)
    # Only unambiguous filenames can safely rewrite relative/concatenated refs.
    candidates = [p for p in candidates if len(names[p.name]) == 1]
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    excluded = []
    for p in files:
        rel = p.relative_to(ROOT)
        if rel.parts[0] in {"tools", "tests", ".github"}:
            excluded.append(rel.as_posix())
            continue
        target = OUT / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(p, target)

    def convert(p):
        rel = p.relative_to(ROOT)
        target = (OUT / rel).with_suffix(".webp")
        with Image.open(p) as im:
            rgba = im.convert("RGBA")
            rgba.save(target, "WEBP", lossless=True, exact=True, method=4)
            with Image.open(target) as result:
                assert result.size == rgba.size
                assert result.convert("RGBA").tobytes() == rgba.tobytes(), str(rel)
        # Keep a PNG when conversion does not actually save space.
        if target.stat().st_size >= p.stat().st_size:
            target.unlink()
            return None
        (OUT / rel).unlink()
        return {"source": rel.as_posix(), "target": rel.with_suffix(".webp").as_posix(),
                "before": p.stat().st_size, "after": target.stat().st_size,
                "pixel_equal": True}

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        conversions = [x for x in pool.map(convert, candidates) if x]
    replacements = {Path(x["source"]).name: Path(x["target"]).name for x in conversions}
    pattern = re.compile(r"(?<![\w.-])(" + "|".join(map(re.escape, replacements)) + r")(?![\w.-])")
    rewritten = []
    invalid_source_json = []
    for p, original in texts.items():
        target = OUT / p.relative_to(ROOT)
        if not target.exists() or p.name == "CHECKSUMS.json":
            continue
        updated = pattern.sub(lambda m: replacements[m.group(1)], original)
        if updated != original:
            target.write_text(updated, encoding="utf-8")
            rewritten.append(p.relative_to(ROOT).as_posix())
            if p.suffix == ".json":
                try:
                    json.loads(original)
                except json.JSONDecodeError:
                    invalid_source_json.append(p.relative_to(ROOT).as_posix())
                else:
                    json.loads(updated)
    # Enforce the final artifact's PNG/WebP selection after all text processing.
    for entry in conversions:
        (OUT / entry["source"]).unlink(missing_ok=True)
        assert (OUT / entry["target"]).is_file()
    # Every rewritten full image path must exist, including every story JSON.
    missing_before, missing_after = set(), set()
    image_ref = re.compile(r"images/assets/[^\s\"'`<>?\\]+?\.(?:png|webp|jpg|jpeg|gif)")
    for p, original in texts.items():
        if p.suffix not in {".js", ".css", ".html", ".json"} or p.name == "CHECKSUMS.json":
            continue
        target = OUT / p.relative_to(ROOT)
        if not target.exists():
            continue
        for ref in image_ref.findall(original):
            if not (ROOT / ref).is_file():
                missing_before.add((p.relative_to(ROOT).as_posix(), ref))
        for ref in image_ref.findall(target.read_text(encoding="utf-8")):
            if not (OUT / ref).is_file():
                missing_after.add((p.relative_to(ROOT).as_posix(), ref))
    introduced = missing_after - missing_before
    assert not introduced, sorted(introduced)
    checksums = {p.relative_to(OUT).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
                 for p in OUT.rglob("*") if p.is_file() and p.name != "CHECKSUMS.json"}
    (OUT / "CHECKSUMS.json").write_text(json.dumps(checksums, ensure_ascii=False, indent=2)+"\n")
    # Ensure Pages serves the staged files directly, without a second Jekyll pass.
    (OUT / ".nojekyll").touch()
    total = sum(p.stat().st_size for p in OUT.rglob("*") if p.is_file())
    groups = defaultdict(list)
    for p in files:
        if p.suffix.lower() in {".png", ".webp", ".json", ".mp3"}:
            groups[hashlib.sha256(p.read_bytes()).hexdigest()].append(p.relative_to(ROOT).as_posix())
    runtime_text = "\n".join(v for p, v in texts.items()
                             if p.suffix in {".js", ".json", ".html", ".css"}
                             and p.name != "CHECKSUMS.json")
    unreferenced_candidates = sorted([
        {"path": p.relative_to(ROOT).as_posix(), "bytes": p.stat().st_size}
        for p in files if p.relative_to(ROOT).parts[0] == "images"
        and p.name not in runtime_text], key=lambda x: -x["bytes"])
    report = {"source_bytes": sum(p.stat().st_size for p in files), "artifact_bytes": total,
              "limit_bytes": LIMIT, "conversions": conversions, "rewritten_files": rewritten,
              "excluded": excluded, "invalid_source_json": invalid_source_json,
              "introduced_missing_references": sorted(introduced),
              "existing_missing_references": sorted(missing_before),
              "duplicate_groups_preserved": [v for v in groups.values() if len(v)>1],
              "no_literal_reference_candidates_preserved": unreferenced_candidates,
              "largest_files": sorted([{"path":p.relative_to(OUT).as_posix(), "bytes":p.stat().st_size}
                                       for p in OUT.rglob("*") if p.is_file()],
                                      key=lambda x:-x["bytes"])[:50]}
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n")
    print(json.dumps({k:report[k] for k in ["source_bytes", "artifact_bytes", "limit_bytes"]}))
    print(f"Converted {len(conversions)} PNGs losslessly; {len(rewritten)} rewritten files; "
          f"{len(missing_before)} pre-existing missing references; no new missing references.")
    assert total < LIMIT, f"Pages artifact {total} bytes exceeds {LIMIT} bytes"


if __name__ == "__main__":
    main()
