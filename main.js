// ─── Custom Cursor System ───
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

let clientX = 0;
let clientY = 0;

document.addEventListener('mousemove', e => {
  clientX = e.clientX;
  clientY = e.clientY;
  
  mx = clientX + window.scrollX;
  my = clientY + window.scrollY;
  
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';

  updateLeonFlashlightAngle();
});

(function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// ─── STRAIGHTFORWARD CODEC CHANNEL SELECTION TUNER ───
const channels     = document.querySelectorAll('.channel-node-btn');
const freqHud      = document.getElementById('codec-frequency-hud');
const codecPanel   = document.getElementById('codec-panel-box');
const staticFog    = document.getElementById('codec-static-fog');
const commsStatus  = document.getElementById('codec-comms-status');
const serialLog    = document.getElementById('codec-serial-log');
const btmIdentity  = document.getElementById('codec-bottom-identity');

channels.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active styles across options array
    channels.forEach(c => c.classList.remove('active-node-selected'));
    btn.classList.add('active-node-selected');

    const selectedFreq = btn.getAttribute('data-freq');
    if (freqHud) freqHud.textContent = `${selectedFreq} MHz`;

    if (selectedFreq === "144.75") {
      // MASTER STABLE DEPLOYMENT HOOK
      if (codecPanel) codecPanel.classList.add('connected-signal');
      if (staticFog) staticFog.style.opacity = '0';
      if (commsStatus) commsStatus.textContent = "> CONNECTION SECURE // BROADCAST LAYER DEPLOYED";
      if (serialLog) serialLog.textContent = "// LINK STABLE // SSG RELAY ONLINE";
      if (btmIdentity) btmIdentity.textContent = "TRANSMISSION VERIFIED";
    } else {
      // MISALIGNED NOISE STATIC CHANNEL
      if (codecPanel) codecPanel.classList.remove('connected-signal');
      if (staticFog) staticFog.style.opacity = '0.85';
      if (commsStatus) commsStatus.textContent = "> SIGNAL UNRECOGNIZED // BROADCAST MATRIX BLOCKED";
      if (serialLog) serialLog.textContent = "// LINK CORRUPTED // STATIC SCAN ACTIVE";
      if (btmIdentity) btmIdentity.textContent = "RECEIVER UNVERIFIED";
    }
  });
});

window.addEventListener('load', () => {
  const loader = document.getElementById('game-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      if (globalLeon) {
        setTimeout(() => {
          runGlobalLeonPatrol(); 
          setInterval(runGlobalLeonPatrol, 6500);
        }, 600);
      }
    }, 2200); 
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.project-entry').forEach(el => observer.observe(el));

const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(8,6,5,0.97)';
      nav.style.borderBottom = '1px solid rgba(244,234,224,0.1)';
    } else {
      nav.style.background = 'linear-gradient(to bottom, rgba(8,6,5,0.98) 0%, transparent 100%)';
      nav.style.borderBottom = 'none';
    }
  });
}