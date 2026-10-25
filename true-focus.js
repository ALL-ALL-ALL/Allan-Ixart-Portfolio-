// True Focus — version JavaScript classique (sans React), inspirée de React Bits.
// Utilisation : ajoute l'attribut data-true-focus sur un titre.
// Chaque morceau séparé par un <br> devient un "mot" qui passe tour à tour au net.

// ─────────────────────────────────────────────
// ➜ Réglages
// ─────────────────────────────────────────────
const OPTIONS = {
  blurAmount: 5,                      // flou des phrases inactives (px)
  borderColor: '#ef4444',             // couleur des coins du cadre
  glowColor: 'rgba(239, 68, 68, 0.6)',// lueur autour des coins
  duration: 0.5,                      // durée du déplacement (secondes)
  pause: 1.5,                         // temps passé sur chaque phrase (secondes)
  loop: false                         // true = tourne en boucle ; false = un seul passage puis tout redevient net
};

const STYLE = `
.tf-frame {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
}
.tf-corner {
  position: absolute;
  width: 0.35em;
  height: 0.35em;
  max-width: 1.2rem;
  max-height: 1.2rem;
  border: 3px solid var(--tf-color);
  border-radius: 3px;
  filter: drop-shadow(0 0 4px var(--tf-glow));
}
.tf-tl { top: -10px; left: -10px; border-right: 0; border-bottom: 0; }
.tf-tr { top: -10px; right: -10px; border-left: 0; border-bottom: 0; }
.tf-bl { bottom: -10px; left: -10px; border-right: 0; border-top: 0; }
.tf-br { bottom: -10px; right: -10px; border-left: 0; border-top: 0; }
`;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function injectStyle() {
  if (document.getElementById('true-focus-style')) return;
  const style = document.createElement('style');
  style.id = 'true-focus-style';
  style.textContent = STYLE;
  document.head.appendChild(style);
}

function setupTrueFocus(root) {
  // 1. Découpe le titre en "mots" (un par ligne)
  const words = [];
  [...root.childNodes].forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // <focus-word> : balise neutre, n'est touchée par aucun style existant
      const word = document.createElement('focus-word');
      word.textContent = node.textContent.trim();
      root.replaceChild(word, node);
      words.push(word);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
      words.push(node); // ex. ton <span>DES APPS.</span> garde son style
    }
  });
  if (words.length < 2) return;

  // 2. Prépare le conteneur et le cadre
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
  root.style.setProperty('--tf-color', OPTIONS.borderColor);
  root.style.setProperty('--tf-glow', OPTIONS.glowColor);

  words.forEach(word => {
    word.style.display = 'inline-block';
    word.style.transition = `filter ${OPTIONS.duration}s ease`;
    word.style.cursor = 'default';
  });

  const frame = document.createElement('div');
  frame.className = 'tf-frame';
  frame.setAttribute('aria-hidden', 'true');
  frame.innerHTML =
    '<div class="tf-corner tf-tl"></div><div class="tf-corner tf-tr"></div>' +
    '<div class="tf-corner tf-bl"></div><div class="tf-corner tf-br"></div>';
  root.appendChild(frame);

  // 3. Met une phrase au net, floute les autres, déplace le cadre
  let active = 0;
  const focus = index => {
    active = index;
    words.forEach((word, i) => {
      word.style.filter = i === index ? 'blur(0px)' : `blur(${OPTIONS.blurAmount}px)`;
    });
    const box = root.getBoundingClientRect();
    const rect = words[index].getBoundingClientRect();
    frame.style.transform = `translate(${rect.left - box.left}px, ${rect.top - box.top}px)`;
    frame.style.width = `${rect.width}px`;
    frame.style.height = `${rect.height}px`;
    frame.style.opacity = '1';
  };

  // Tout net, cadre caché (état de départ et état final)
  const clearFocus = () => {
    words.forEach(word => (word.style.filter = 'blur(0px)'));
    frame.style.opacity = '0';
  };

  // 4. Défilement automatique + survol
  let timer = null;
  let finished = false;
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (finished) {
      clearFocus();
      return;
    }
    timer = setInterval(() => {
      if (!OPTIONS.loop && active === words.length - 1) {
        stop();
        finished = true;
        clearFocus();
        return;
      }
      focus((active + 1) % words.length);
    }, (OPTIONS.duration + OPTIONS.pause) * 1000);
  };

  words.forEach((word, i) => {
    word.addEventListener('mouseenter', () => {
      stop();
      focus(i);
    });
  });
  root.addEventListener('mouseleave', start);
  window.addEventListener('resize', () => focus(active));

  // 5. Démarre quand le titre apparaît à l'écran
  const play = () => {
    focus(0);
    // Active les transitions du cadre après le premier placement (évite un glissement au départ)
    requestAnimationFrame(() => {
      const d = OPTIONS.duration;
      frame.style.transition = `transform ${d}s ease, width ${d}s ease, height ${d}s ease, opacity 0.3s ease`;
    });
    start();
  };

  const observer = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        play();
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(root);
}

// Attend que les polices soient chargées pour mesurer correctement les phrases
if (!reducedMotion) {
  injectStyle();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    document.querySelectorAll('[data-true-focus]').forEach(setupTrueFocus);
  });
}