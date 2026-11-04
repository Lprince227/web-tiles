# web-tiles

A gallery of small web pages, one per contributor, shown as a grid of live tiles.

## Running it

Needs Python 3.10 or later and a web browser. Nothing else to install.

```sh
python server.py
```

Then open <http://localhost:8000/>. On macOS and Linux the command may be `python3`.

## Adding your name

1. Fork this repository.
2. In your fork on GitHub, open the file in `names/` for the first letter of your first name,
   and edit it with the pencil button.
3. Add one line with your first name under the heading for your letter. Change nothing else.
4. Commit the change, then open a pull request.

## Adding your area

1. Clone your fork.
2. Create `areas/<your-github-username>/` with an `index.html` and a `SPEC.md`. Change
   nothing outside that folder.
3. Run the server and check your tile, and your area full screen.
4. Commit, push to your fork, and open a pull request.

The rules for areas are in `CLAUDE.md`; what the gallery does is in `docs/SPEC.md`.
`areas/bcdroid/` is an example.
