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
  if (el) {
    el.innerText = count.toLocaleString();
    animateCount(el, count);
  }
}

function animateCount(el, target) {
  let current = Math.max(0, target - 20);
  const step = Math.ceil((target - current) / 20);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.innerText = current.toLocaleString();
    if (current >= target) clearInterval(interval);
  }, 50);
}

// دەستپێکردن
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisitorCounter);
} else {
  initVisitorCounter();
}
