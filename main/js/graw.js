const games = [
  { name: "Storm Blade",   img: "go.png",  bg: "#FFE0B2", rating: "★ 4.8", players: "8.2K", isNew: true, page: "main/game/tower.html"  },
{ name: "Neon Drift",    img: "google.png",  bg: "#E3F2FD", rating: "★ 4.7", players: "5.1K", isNew: false, page: "main/game/towerv2.html" },
  { name: "Sky Raid",      emoji: "✈️",  bg: "#F3E5F5", rating: "★ 4.9", players: "11K",  isNew: true  },
  { name: "Pixel Quest",   emoji: "🕹️",  bg: "#E8F5E9", rating: "★ 4.5", players: "3.4K", isNew: false },
  { name: "Fire Arena",    emoji: "🔥",  bg: "#FFF3E0", rating: "★ 4.6", players: "6.7K", isNew: false },
  { name: "Cyber Run",     emoji: "🤖",  bg: "#F0F4FD", rating: "★ 4.8", players: "9.3K", isNew: true  },
];

function renderGames() {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = games.map(g => `
    <div class="game-card" onclick="playGame('${g.name}')">
      ${g.img
        ? `<div class="game-thumb game-thumb-full" style="background:${g.bg}">
             <img src="${g.img}" alt="${g.name}"/>
             ${g.isNew ? '<span class="game-new-badge">نوێ</span>' : ''}
<button class="game-play-over" onclick="event.stopPropagation(); playGame('${g.name}')">
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="vertical-align:middle; margin-left:6px">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
  یاریبکە
</button>

           </div>`
        : `<div class="game-thumb" style="background:${g.bg}">
             ${g.emoji}
             ${g.isNew ? '<span class="game-new-badge">نوێ</span>' : ''}
           </div>
           <div class="game-info">
             <div class="game-name">${g.name}</div>
             <div class="game-rating">${g.rating} · ${g.players} یاریزان</div>
             <button class="game-play" onclick="event.stopPropagation(); playGame('${g.name}')">&#9654; یاریبکە</button>
           </div>`
      }
    </div>
  `).join('');
}


function startSplash1() {
  const bar = document.getElementById('loadingBar');
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 14 + 4;
    if (pct >= 100) {
      pct = 100;
      bar.style.width = '100%';
      clearInterval(interval);
      setTimeout(showSplash2, 500);
    } else {
      bar.style.width = pct + '%';
    }
  }, 120);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.pointerEvents = 'none';
  });
  const target = document.getElementById(id);
  target.classList.add('active');
  target.style.pointerEvents = 'all';
}

function showSplash2() { showScreen('splash2'); }

function goHome() {
  showScreen('home');
  renderGames();
  animateHomeCards();
}

function animateHomeCards() {
  const cards = document.querySelectorAll('.game-card');
  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    c.style.transition = 'none';
    setTimeout(() => {
      c.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 80 + i * 70);
  });
}

// FIX: setNav ئێستا بەبێ پارامیتەری section کار دەکات
function setNav(btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function openProfile() {
  const m = document.getElementById('profileModal');
  m.style.display = 'flex';
  requestAnimationFrame(() => m.classList.add('open'));
}
function openSettings() {
  const m = document.getElementById('settingsModal');
  m.style.display = 'flex';
  requestAnimationFrame(() => m.classList.add('open'));
}
function closeModal(id) {
  const m = document.getElementById(id);
  m.classList.remove('open');
  setTimeout(() => { m.style.display = 'none'; }, 300);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => {
      m.classList.remove('open');
      setTimeout(() => { m.style.display = 'none'; }, 300);
    });
  }
});

function playGame(name) {
  const game = games.find(g => g.name === name);
if (game && game.page) {
    const toast = document.createElement('div');
    toast.textContent = `⚡ ${name} دەکرێتەوە...`;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '90px', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: '#111', color: '#FFD700',
      fontFamily: "'Noto Kufi Arabic', 'Cairo', sans-serif",
      fontSize: '14px', fontWeight: '700',
      padding: '12px 24px', borderRadius: '50px',
      zIndex: '999', opacity: '0',
      transition: 'opacity 0.3s, transform 0.3s',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      direction: 'rtl', whiteSpace: 'nowrap'
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      window.location.replace(game.page);
    }, 900);
    return;
  }


  const toast = document.createElement('div');
  toast.textContent = `⚡ ${name} دەکرێتەوە...`;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '90px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#111', color: '#FFD700',
    fontFamily: "'Noto Kufi Arabic', 'Cairo', sans-serif",
    fontSize: '14px', fontWeight: '700',
    padding: '12px 24px', borderRadius: '50px',
    zIndex: '999', opacity: '0',
    transition: 'opacity 0.3s, transform 0.3s',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    direction: 'rtl', whiteSpace: 'nowrap'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 2200);
}


document.addEventListener('click', e => {
  if (e.target.classList.contains('cat-btn')) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('ad-cta')) {
    const toast = document.createElement('div');
    toast.textContent = '🎉 سوپاس! بەم زووانە پەیوەندیت پێ دەکرێت.';
    Object.assign(toast.style, {
      position: 'fixed', top: '80px', left: '50%',
      transform: 'translateX(-50%)',
      background: '#FFD700', color: '#111',
      fontFamily: "'Noto Kufi Arabic', 'Cairo', sans-serif",
      fontSize: '13px', fontWeight: '800',
      padding: '12px 22px', borderRadius: '50px',
      zIndex: '999', boxShadow: '0 4px 20px rgba(255,215,0,0.4)',
      direction: 'rtl', whiteSpace: 'nowrap'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('logout-btn')) {
    closeModal('settingsModal');
    setTimeout(() => { showScreen('splash2'); }, 350);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal').forEach(m => {
    m.classList.remove('open');
    m.style.display = 'none';
  });
  showScreen('splash1');
  startSplash1();
});