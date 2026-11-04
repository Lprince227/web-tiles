# web-tiles

A gallery of small web pages, one per contributor, shown as a grid of live tiles. Read
`docs/SPEC.md` for what the gallery and an area must do, and `docs/adr/` for the decisions
behind it.

## Rules for every change

- **A contributor's change stays inside `areas/<their-github-username>/`.** Do not edit,
  rename, or delete anything outside that folder: not the gallery, not `server.py`, not
  `docs/`, not another contributor's area. Ask the user for their GitHub username if it is not
  clear from `git remote -v`.
- **Every area has a `SPEC.md`** that says what the area does and how to use it. Write or
  update it in the same commit as the code it describes.
- **Plain HTML, CSS, and JavaScript only.** No build step, no npm, no frameworks, and no
  files or fonts loaded from other websites. Everything the area needs is in its folder.
- **Relative paths only** (`./game.js`, not `/game.js` and not `/areas/...`).
- **No storage, no network.** Do not use `localStorage`, cookies, `fetch`, or WebSockets.
- **The area must work in a 1280 by 800 window** and in a full-screen window. Keyboard input
  must work after the user clicks inside the area.
- **Decisions are recorded.** A change to the gallery itself (anything outside `areas/`) needs
  a decision record in `docs/adr/`, numbered next, as a Y-statement. Such changes are made by
  the repository owner, not by contributors.
- Commit messages say what the change does. One feature per commit.

## Running

```sh
python server.py
```

Then open <http://localhost:8000/>. An area on its own is at
<http://localhost:8000/areas/<username>/>.
