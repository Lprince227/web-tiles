"""Serve the web-tiles gallery: static files, plus /api/areas listing the areas."""

import argparse
import html
import json
import re
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
AREAS = ROOT / "areas"
TITLE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)


def area_title(index):
    try:
        match = TITLE.search(index.read_text(encoding="utf-8", errors="replace"))
    except OSError:
        return None
    if match:
        title = html.unescape(" ".join(match.group(1).split()))
        return title or None
    return None


def list_areas():
    areas = []
    if AREAS.is_dir():
        for folder in sorted(AREAS.iterdir(), key=lambda p: p.name.lower()):
            index = folder / "index.html"
            if folder.is_dir() and index.is_file():
                areas.append({
                    "name": folder.name,
                    "title": area_title(index) or folder.name,
                    "url": f"areas/{folder.name}/",
                })
    return areas


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.split("?")[0] == "/api/areas":
            body = json.dumps(list_areas()).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

    def end_headers(self):
        # Every reload shows the latest pull, not a cached copy.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description="Serve the web-tiles gallery.")
    parser.add_argument("--port", type=int, default=8000, help="port (default 8000)")
    parser.add_argument("--host", default="127.0.0.1", help="address to listen on (default 127.0.0.1)")
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), partial(Handler, directory=str(ROOT)))
    print(f"web-tiles: http://localhost:{args.port}/  (Ctrl+C to stop)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
