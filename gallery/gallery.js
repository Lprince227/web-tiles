// Build one tile per area from /api/areas. Each area runs in its own iframe at
// 1280x800, scaled to fit its tile (docs/adr/0003-scaled-iframe-tiles.md).

const AREA_WIDTH = 1280;
const grid = document.getElementById("grid");
const across = document.getElementById("across");
const acrossValue = document.getElementById("across-value");

function setAcross(n) {
  grid.style.setProperty("--across", n);
  across.value = n;
  acrossValue.textContent = n;
  try { localStorage.setItem("web-tiles-across", n); } catch {}
}

// Keep each iframe's scale equal to its tile's width over 1280.
const resize = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const scale = entry.contentRect.width / AREA_WIDTH;
    entry.target.style.setProperty("--scale", scale);
  }
});

function tile(area) {
  const el = document.createElement("section");
  el.className = "tile";

  const bar = document.createElement("div");
  bar.className = "tile-bar";

  const title = document.createElement("span");
  title.className = "tile-title";
  title.textContent = area.title;
  title.title = area.title;

  const name = document.createElement("span");
  name.className = "tile-name";
  name.textContent = area.name;

  const view = document.createElement("div");
  view.className = "tile-view";

  const frame = document.createElement("iframe");
  frame.src = area.url;
  frame.title = area.title;
  frame.loading = "lazy";
  frame.allow = "fullscreen; autoplay";

  const full = document.createElement("button");
  full.type = "button";
  full.textContent = "full screen";
  full.addEventListener("click", async () => {
    try {
      await frame.requestFullscreen();
      frame.focus();
      frame.contentWindow?.focus();
    } catch (err) {
      console.warn("full screen refused:", err);
    }
  });

  const open = document.createElement("a");
  open.href = area.url;
  open.target = "_blank";
  open.rel = "noopener";
  open.textContent = "open";

  bar.append(title, name, full, open);
  view.append(frame);
  el.append(bar, view);
  resize.observe(view);
  return el;
}

async function load() {
  let areas = [];
  try {
    const response = await fetch("api/areas");
    areas = await response.json();
  } catch (err) {
    grid.innerHTML = '<p class="empty">Could not load the list of areas. Is server.py running?</p>';
    return;
  }
  document.getElementById("count").textContent =
    `${areas.length} area${areas.length === 1 ? "" : "s"}`;
  if (areas.length === 0) {
    grid.innerHTML = '<p class="empty">No areas yet. Add a folder under areas/.</p>';
    return;
  }
  grid.replaceChildren(...areas.map(tile));
}

across.addEventListener("input", () => setAcross(across.value));
let saved = null;
try { saved = localStorage.getItem("web-tiles-across"); } catch {}
setAcross(saved || 4);
load();
