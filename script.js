let candleLit = false;
let selectedNote = '20';

const NOTE_THEMES = {
  '20': { fill: '#4aa96c', stroke: '#2d7a47', inner: '#a6e3b9', label: '๒๐' },
  '50': { fill: '#3b82c4', stroke: '#22588c', inner: '#a8d5ff', label: '๕๐' },
  '100': { fill: '#d64550', stroke: '#992630', inner: '#ffb8be', label: '๑๐๐' },
  '500': { fill: '#8e54a2', stroke: '#5c2f6e', inner: '#dfbdf0', label: '๕๐๐' },
  '1000': { fill: '#9c8a72', stroke: '#6b5c48', inner: '#e8decb', label: '๑๐๐๐' }
};

function buildKrathongSVG(lit = false) {
  const outerPetals = [-72, -48, -24, 0, 24, 48, 72]
    .map((xOff, idx) => {
      const cx = 115 + xOff;
      const h = idx === 3 ? 44 : 39;
      return `<path d="M${cx - 18},122 Q${cx},${122 - h} ${cx + 18},122 Q${cx},132 ${cx - 18},122 Z" fill="url(#k_outer)" stroke="rgba(255,255,255,0.28)" stroke-width="0.9"/>`;
    })
    .join('');

  const innerPetals = [-56, -33, -11, 11, 33, 56]
    .map((xOff) => {
      const cx = 115 + xOff;
      return `<path d="M${cx - 14},126 Q${cx},93 ${cx + 14},126 Q${cx},134 ${cx - 14},126 Z" fill="url(#k_inner)" />`;
    })
    .join('');

  const leafTips = [-76, -54, -32, -10, 12, 34, 56, 76]
    .map((xOff, i) => {
      const cx = 115 + xOff;
      const fill = i % 2 === 0 ? '#2fa36b' : '#1f6f4a';
      return `<polygon points="${cx - 14},136 ${cx},114 ${cx + 14},136" fill="${fill}" stroke="#44b97f" stroke-width="0.7"/>`;
    })
    .join('');

  const garland = [-66, -44, -22, 0, 22, 44, 66]
    .map((xOff) => `<circle cx="${115 + xOff}" cy="129" r="5.2" fill="#ffd97d" />`)
    .join('');

  const flameMarkup = lit
    ? `
      <g class="svg-flame">
        <circle cx="115" cy="22" r="19" fill="url(#k_aura)" />
        <g class="svg-flame-core">
          <path d="M115,7 C108,17 108,28 115,32 C122,28 122,17 115,7 Z" fill="#ffb703" />
          <path d="M115,13 C111,20 111,27 115,30 C119,27 119,20 115,13 Z" fill="#fff7cc" />
        </g>
        <circle cx="101" cy="31" r="2.2" fill="#ff6d00" />
        <circle cx="106" cy="28" r="2.2" fill="#ff6d00" />
        <circle cx="125" cy="30" r="2.2" fill="#ff6d00" />
        <path d="M101,29 Q97,18 103,9" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M125,28 Q129,17 123,8" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round"/>
      </g>`
    : `
      <line x1="115" y1="27" x2="115" y2="32" stroke="#3c2a1e" stroke-width="1.6" stroke-linecap="round"/>
    `;

  return `
    <svg viewBox="0 0 230 185" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="k_outer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffb8d0" />
          <stop offset="100%" stop-color="#ff6f9c" />
        </linearGradient>
        <linearGradient id="k_inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#ffb8d0" />
        </linearGradient>
        <linearGradient id="k_trunk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2fa36b" />
          <stop offset="100%" stop-color="#13472e" />
        </linearGradient>
        <radialGradient id="k_aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffe680" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#ff9900" stop-opacity="0" />
        </radialGradient>
      </defs>

      <line x1="108" y1="88" x2="101" y2="31" stroke="#b56548" stroke-width="2" stroke-linecap="round" />
      <line x1="111" y1="88" x2="106" y2="28" stroke="#b56548" stroke-width="2" stroke-linecap="round" />
      <line x1="120" y1="88" x2="125" y2="30" stroke="#b56548" stroke-width="2" stroke-linecap="round" />

      <rect x="110" y="32" width="10" height="54" rx="4" fill="#ffd972" stroke="#e5a93c" stroke-width="1" />
      ${flameMarkup}

      <!-- Thai Banknote tucked in the krathong -->
      <g id="krathongBanknote" transform="translate(132, 62) rotate(14)">
        <rect x="0" y="0" width="46" height="24" rx="2.5" fill="${NOTE_THEMES[selectedNote].fill}" stroke="${NOTE_THEMES[selectedNote].stroke}" stroke-width="1.3"/>
        <rect x="3" y="3" width="40" height="18" rx="1.5" fill="none" stroke="${NOTE_THEMES[selectedNote].inner}" stroke-width="0.9" stroke-dasharray="2 2"/>
        <text x="23" y="16" text-anchor="middle" fill="#ffffff" font-size="9.5" font-weight="bold" font-family="sans-serif">${NOTE_THEMES[selectedNote].label}</text>
      </g>

      ${outerPetals}
      ${innerPetals}

      <g transform="translate(115, 88)">
        <path d="M0,7 C-12,-2 -18,-12 -10,-18 C-5,-21 -1,-17 0,-13 C1,-17 5,-21 10,-18 C18,-12 12,-2 0,7 Z" fill="#ff5480" stroke="#ffe39a" stroke-width="1.6" />
      </g>

      ${leafTips}
      ${garland}

      <path d="M26,135 Q115,150 204,135 L194,156 Q115,173 36,156 Z" fill="url(#k_trunk)" stroke="#48bf84" stroke-width="1" />
      <ellipse cx="115" cy="135" rx="89" ry="9" fill="#257a50" />
      <path d="M36,148 Q115,164 194,148" fill="none" stroke="#ffd470" stroke-width="2" stroke-dasharray="5 4" opacity="0.8" />
    </svg>
  `;
}

const burstParticles = [];

function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.64,
    r: Math.random() * 1.6 + 0.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.015 + Math.random() * 0.025
  }));

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  window.spawnSparkleBurst = (cx, cy) => {
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.2;
      const speed = 1.4 + Math.random() * 3;
      burstParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0,
        alpha: 1,
        color: i % 2 === 0 ? '#ffd470' : '#ff7597',
        size: 2.8 + Math.random() * 3.5
      });
    }
  };

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.phase += s.speed;
      const alpha = 0.35 + 0.65 * Math.abs(Math.sin(s.phase));
      ctx.fillStyle = `rgba(255, 248, 225, ${alpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.alpha -= 0.018;
      if (p.alpha <= 0) {
        burstParticles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

function lightAndFloatKrathong() {
  if (candleLit) return;
  candleLit = true;

  const selector = document.getElementById('banknoteSelector');
  if (selector) selector.classList.add('hidden');

  const renderEl = document.getElementById('dockKrathongRender');
  const auraEl = document.getElementById('dockCandleAura');
  const stageWrap = document.getElementById('krathongStageWrap');

  renderEl.innerHTML = buildKrathongSVG(true);
  auraEl.classList.remove('hidden');

  if (window.spawnSparkleBurst) {
    const rect = renderEl.getBoundingClientRect();
    window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + 30);
  }

  setTimeout(() => {
    stageWrap.classList.add('floating-away');
  }, 500);

  // Little kid(s) swim over in the river to grab the selected Thai banknote
  setTimeout(() => {
    const kidWrap = document.getElementById('swimmingKidWrap');
    const grabbedNote = document.getElementById('grabbedNote');
    const theme = NOTE_THEMES[selectedNote];

    document.getElementById('grabbedNoteRect').setAttribute('fill', theme.fill);
    document.getElementById('grabbedNoteRect').setAttribute('stroke', theme.stroke);
    document.getElementById('grabbedNoteInner').setAttribute('stroke', theme.inner);
    document.getElementById('grabbedNoteText').textContent = theme.label;

    kidWrap.classList.remove('hidden');
    kidWrap.classList.add('swimming');

    // Expensive banknotes attract a crowd of swimmers!
    const extraCount =
      selectedNote === '1000' ? 5 :
      selectedNote === '500' ? 3 :
      selectedNote === '100' ? 1 : 0;

    const directions = [
      'swimming-from-right',
      'swimming-from-top',
      'swimming-from-bottom',
      'swimming-from-top-left',
      'swimming-from-top-right'
    ];

    for (let i = 0; i < extraCount; i++) {
      const clone = kidWrap.cloneNode(true);
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      clone.classList.remove('swimming');
      clone.classList.add(directions[i % directions.length]);
      clone.style.animationDelay = `${(i + 1) * 0.18}s`;
      stageWrap.appendChild(clone);
    }

    setTimeout(() => {
      const noteInKrathong = document.getElementById('krathongBanknote');
      if (noteInKrathong) noteInKrathong.style.display = 'none';
      if (grabbedNote) grabbedNote.classList.remove('hidden');

      // Show cartoon fighting/scuffle splash effect when multiple people fight over expensive notes
      if (extraCount > 0) {
        const scuffle = document.createElement('div');
        scuffle.className = 'scuffle-effect';
        scuffle.innerHTML = `
          <svg viewBox="0 0 200 140" width="210" height="150" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="75" r="32" fill="rgba(255,255,255,0.75)" />
            <circle cx="105" cy="60" r="38" fill="rgba(225,245,255,0.85)" />
            <circle cx="135" cy="78" r="30" fill="rgba(255,255,255,0.75)" />
            <circle cx="100" cy="92" r="28" fill="rgba(210,238,255,0.8)" />
            <polygon points="45,35 55,48 70,40 60,55 75,65 56,64 50,78 44,62 28,60 42,50" fill="#ffbe0b" stroke="#fb5607" stroke-width="2"/>
            <polygon points="150,28 158,42 174,36 162,50 176,62 158,58 152,72 146,56 130,54 144,44" fill="#ff006e" stroke="#ffffff" stroke-width="2"/>
            <path d="M90,22 L102,42 L86,44 L106,66" fill="none" stroke="#ffbe0b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        stageWrap.appendChild(scuffle);
        renderEl.classList.add('scuffle-wobble');
        setTimeout(() => {
          scuffle.remove();
          renderEl.classList.remove('scuffle-wobble');
        }, 1100);
      }
    }, 2000);
  }, 3400);
}

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  document.getElementById('dockKrathongRender').innerHTML = buildKrathongSVG(false);

  document.getElementById('banknoteSelector').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.target.closest('.note-btn');
    if (!btn || candleLit) return;
    document.querySelectorAll('.note-btn').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedNote = btn.dataset.note;
    document.getElementById('dockKrathongRender').innerHTML = buildKrathongSVG(false);
  });

  document.addEventListener('click', lightAndFloatKrathong);
});
