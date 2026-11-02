"""Portable structural inspection of the generated PPTX specimens (Python stdlib only)."""
from pathlib import Path, PurePosixPath
from zipfile import ZipFile
from xml.etree import ElementTree as ET
import json
import posixpath

NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main", "a": "http://schemas.openxmlformats.org/drawingml/2006/main", "c": "http://schemas.openxmlformats.org/drawingml/2006/chart"}
reports = []
for file in sorted(Path("examples").rglob("theme.pptx")):
    with ZipFile(file) as z:
        names = set(z.namelist())
        roots = {name: ET.fromstring(z.read(name)) for name in names if name.endswith((".xml", ".rels"))}
        broken = []
        for name, root in roots.items():
            if not name.endswith(".rels"):
                continue
            origin = posixpath.dirname(posixpath.dirname(name))
            for rel in root:
                if rel.get("TargetMode") == "External":
                    continue
                target = rel.get("Target", "")
                resolved = posixpath.normpath(posixpath.join(origin, target)).lstrip("/")
                if resolved not in names:
                    broken.append([name, target])
        slides = sorted(name for name in names if name.startswith("ppt/slides/slide") and name.endswith(".xml"))
        native_text = sum(len(roots[n].findall(".//a:t", NS)) for n in slides)
        native_tables = sum(len(roots[n].findall(".//a:tbl", NS)) for n in slides)
        native_charts = sum(len(roots[n].findall(".//c:chart", NS)) for n in slides)
        workbooks = sum(name.startswith("ppt/embeddings/") and name.endswith(".xlsx") for name in names)
        if len(slides) != 6 or broken or native_tables != 1 or native_charts != 1 or not workbooks or not native_text:
            raise RuntimeError(f"Invalid export: {file}, slides={len(slides)}, broken={broken}")
        reports.append({"file": file.as_posix(), "slides": len(slides), "nativeTextRuns": native_text, "nativeTables": native_tables, "nativeCharts": native_charts, "embeddedWorkbooks": workbooks, "brokenRelationships": broken})
Path("docs/validation").mkdir(parents=True, exist_ok=True)
Path("docs/validation/pptx-structure.json").write_text(json.dumps({"reports": reports, "nativePowerPointTest": False, "nativeWPSTest": False}, indent=2), encoding="utf-8")
print(f"Validated {len(reports)} PPTX exports / {sum(r['slides'] for r in reports)} slides; editable native text, table, chart + embedded workbook present.")
