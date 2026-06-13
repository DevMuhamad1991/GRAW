// ══ VISITOR COUNTER — Supabase ══
const SUPA_URL = 'https://csbhyglhhyorzkwofqsp.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzYmh5Z2xoaHlvcnprd29mcXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjk1NTAsImV4cCI6MjA5Njk0NTU1MH0.E6MLP2PKf9nLCchwU-IURfsozZ4AjgPv9kHzovSY4wg';

async function recordVisit() {
  try {
    await fetch(`${SUPA_URL}/rest/v1/visits`, {
      method: 'POST',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ visited_at: new Date().toISOString() })
    });
  } catch(e) {}
}

async function getVisitorCount() {
  try {
    const res = await fetch(`${SUPA_URL}/rest/v1/visits?select=count`, {
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Prefer': 'count=exact'
      }
    });
    const count = res.headers.get('content-range')?.split('/')[1] || '0';
    return parseInt(count);
  } catch(e) { return 0; }
}

async function initVisitorCounter() {
  await recordVisit();
  const count = await getVisitorCount();
  const el = document.getElementById('visitorCount');
  if (el) animateCount(el, count + 200);
}

function animateCount(el, target) {
  let current = 0;
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let i = 0;
  const interval = setInterval(() => {
    current = Math.min(current + increment, target);
    const display = i < steps * 0.3
      ? String(Math.floor(current)).padStart(3, '0')
      : Math.floor(current).toLocaleString();
    el.innerText = display;
    const bar = document.getElementById('visitorBar');
    if (bar) bar.style.width = ((i / steps) * 100) + '%';
    if (++i >= steps) {
      el.innerText = target.toLocaleString();
      if (bar) bar.style.width = '100%';
      clearInterval(interval);
    }
  }, duration / steps);
}

// دەستپێکردن
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisitorCounter);
} else {
  initVisitorCounter();
}
