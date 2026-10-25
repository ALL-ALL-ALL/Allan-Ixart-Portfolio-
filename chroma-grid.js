// Chroma Grid — version JavaScript classique (sans React), inspirée de React Bits.
// Garde tes cartes Bootstrap telles quelles et ajoute :
//   • une grille en noir et blanc, avec les couleurs qui reviennent autour de la souris
//   • un halo lumineux + une bordure colorée sur la carte survolée
//
// Utilisation : ajoute data-chroma sur le conteneur de cartes.
//   <div class="row g-4" data-chroma> ... </div>
// Optionnel : data-color="#ef4444" sur une .card pour choisir sa couleur.

// ─────────────────────────────────────────────
// ➜ Réglages
// ─────────────────────────────────────────────
const OPTIONS = {
  radius: 320,                    // taille de la zone en couleur autour de la souris (px)
  grayscale: 0.9,                 // 0 = pas de gris, 1 = noir et blanc total
  brightness: 0.8,                // assombrissement hors de la zone (1 = aucun)
  smoothing: 0.15,                // fluidité du suivi (plus petit = plus doux, plus lent)
  colors: ['#ef4444', '#3b5bff']  // couleurs des bordures, alternées d'une carte à l'autre
};

const STYLE = `
.chroma-grid { position: relative; }

.chroma-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  -webkit-backdrop-filter: grayscale(var(--cg-gray)) brightness(var(--cg-bright));
  backdrop-filter: grayscale(var(--cg-gray)) brightness(var(--cg-bright));
  --cg-mask: radial-gradient(
    circle var(--cg-r) at var(--cg-x) var(--cg-y),
    transparent 0%, transparent 15%,
    rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%,
    rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%,
    rgba(0,0,0,0.68) 88%, #000 100%
  );
  -webkit-mask-image: var(--cg-mask);
  mask-image: var(--cg-mask);
}

.chroma-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }

.chroma-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 65%);
}

.chroma-card:hover::after { opacity: 1; }

.chroma-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 0 1px var(--card-color), 0 10px 30px -10px var(--card-color);
}
`;

function setupChroma(grid) {
  grid.classList.add('chroma-grid');
  grid.style.setProperty('--cg-gray', OPTIONS.grayscale);
  grid.style.setProperty('--cg-bright', OPTIONS.brightness);

  const overlay = document.createElement('div');
  overlay.className = 'chroma-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  grid.appendChild(overlay);

  // Halo + bordure colorée sur chaque carte
  grid.querySelectorAll('.card').forEach((card, i) => {
    card.classList.add('chroma-card');
    card.style.setProperty('--card-color', card.dataset.color || OPTIONS.colors[i % OPTIONS.colors.length]);
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  // Zone en couleur qui suit la souris (avec un léger retard pour la fluidité)
  const current = { x: 0, y: 0, r: 0 };
  const target = { x: 0, y: 0, r: 0 };
  let raf = 0;

  const render = () => {
    grid.style.setProperty('--cg-x', `${current.x}px`);
    grid.style.setProperty('--cg-y', `${current.y}px`);
    grid.style.setProperty('--cg-r', `${Math.max(1, current.r)}px`);
  };

  const loop = () => {
    const k = OPTIONS.smoothing;
    current.x += (target.x - current.x) * k;
    current.y += (target.y - current.y) * k;
    current.r += (target.r - current.r) * k;
    render();
    const moving =
      Math.abs(target.x - current.x) > 0.5 ||
      Math.abs(target.y - current.y) > 0.5 ||
      Math.abs(target.r - current.r) > 0.5;
    if (moving) {
      raf = requestAnimationFrame(loop);
    } else {
      Object.assign(current, target);
      render();
      raf = 0;
    }
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  grid.addEventListener('pointerenter', event => {
    // La zone apparaît directement sous la souris, sans glisser depuis le coin
    const box = grid.getBoundingClientRect();
    current.x = target.x = event.clientX - box.left;
    current.y = target.y = event.clientY - box.top;
  });

  grid.addEventListener('pointermove', event => {
    const box = grid.getBoundingClientRect();
    target.x = event.clientX - box.left;
    target.y = event.clientY - box.top;
    target.r = OPTIONS.radius;
    kick();
  });

  grid.addEventListener('pointerleave', () => {
    target.r = 0; // la zone se referme, tout redevient gris
    kick();
  });

  render();
}

// Uniquement sur les écrans avec une souris : sur mobile, les cartes restent en couleur
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);
  document.querySelectorAll('[data-chroma]').forEach(setupChroma);
}