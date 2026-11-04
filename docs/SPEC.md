# web-tiles specification

A web page that shows many small web pages at once, one per contributor, as a grid of live
tiles.

## Areas

- An **area** is a folder `areas/<github-username>/` containing at least `index.html` and
  `SPEC.md`.
- An area is plain HTML, CSS, and JavaScript. No build step, no packages, and no files loaded
  from other websites.
- An area's files refer only to files in its own folder, by relative path.
- An area's `SPEC.md` says what the area does and how to use it (keys, clicks).
- An area should look right in a full browser window. It does not need to adapt to a small
  tile; the gallery scales it.

## Gallery

- `python server.py` serves the gallery at <http://localhost:8000/>. Python 3.10 or later,
  standard library only.
- The front page shows one tile per area, in alphabetical order of folder name. A folder with
  no `index.html` is not shown.
- Each tile shows the area running, scaled down from a 1280 by 800 window. At a browser width
  of 1280 pixels at least four tiles fit across.
- Each tile shows the area's title (the `<title>` of its `index.html`, or the folder name if
  there is none) and its folder name.
- Each tile has a **full screen** button, which shows the area full screen until Escape is
  pressed, and an **open** link, which opens the area on its own page.
- A control changes the number of tiles across.
- An area that fails (a JavaScript error, a missing file) affects only its own tile.

## Names

- `names/` holds one file per range of initials (`names-A-to-C.txt`, ...), with a `## X`
  heading for each letter. A contributor adds one line under the heading for their initial.

## Repository rules

See `CLAUDE.md`.
