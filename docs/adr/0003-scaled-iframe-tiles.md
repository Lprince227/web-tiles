# 3. Tiles are scaled iframes

Accepted, 2026-11-03.

In the context of showing 30 areas at once on a 1280-pixel-wide screen, facing areas written
for a full browser window, we decided for one iframe per area at a fixed 1280 by 800 size,
scaled down with a CSS transform, with a full-screen button that removes the scaling, and
neglected asking each area to adapt to a small tile, to achieve tiles that are small copies of
the full page with no extra work from contributors, and an area whose errors stay inside its
own iframe, accepting that text in a tile is too small to read and that 30 running areas use
noticeable CPU.
