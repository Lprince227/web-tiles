// Fireflies drift and blink over a night sky. Click adds a cluster, the arrow
// keys set the wind, and Space clears the sky.

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
const flies = [];
const wind = { x: 0, y: 0 };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function addFly(x, y) {
  flies.push({
    x, y,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    phase: Math.random() * Math.PI * 2,
    hue: 50 + Math.random() * 40,
  });
}

function addCluster(x, y, n) {
  for (let i = 0; i < n; i++) {
    addFly(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60);
  }
}

function step(t) {
  ctx.fillStyle = "rgba(11, 16, 38, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const f of flies) {
    f.vx += (Math.random() - 0.5) * 0.05 + wind.x * 0.01;
    f.vy += (Math.random() - 0.5) * 0.05 + wind.y * 0.01;
    f.vx *= 0.98;
    f.vy *= 0.98;
    f.x = (f.x + f.vx + canvas.width) % canvas.width;
    f.y = (f.y + f.vy + canvas.height) % canvas.height;

    const glow = 0.5 + 0.5 * Math.sin(t / 400 + f.phase);
    const r = 2 + glow * 4;
    const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 4);
    g.addColorStop(0, `hsla(${f.hue}, 100%, 70%, ${glow})`);
    g.addColorStop(1, `hsla(${f.hue}, 100%, 50%, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(f.x, f.y, r * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(step);
}

canvas.addEventListener("click", (e) => addCluster(e.clientX, e.clientY, 12));

window.addEventListener("keydown", (e) => {
  const keys = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  if (keys[e.key]) {
    wind.x = keys[e.key][0];
    wind.y = keys[e.key][1];
    e.preventDefault();
  } else if (e.key === " ") {
    flies.length = 0;
    wind.x = wind.y = 0;
    e.preventDefault();
  }
});

window.addEventListener("resize", resize);
resize();
for (let i = 0; i < 60; i++) addFly(Math.random() * canvas.width, Math.random() * canvas.height);
requestAnimationFrame(step);
