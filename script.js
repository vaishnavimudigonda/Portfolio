// ─── CURSOR ────────────────────────────────────
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});

function animRing(){
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a,button,.proj-card,.info-box,.exp-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.width='6px';cur.style.height='6px';
    ring.style.width='52px';ring.style.height='52px';
    ring.style.opacity='.8';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.width='10px';cur.style.height='10px';
    ring.style.width='36px';ring.style.height='36px';
    ring.style.opacity='.5';
  });
});

// hide cursor on mobile
if('ontouchstart' in window){
  cur.style.display='none';ring.style.display='none';
}

// ─── NAV SCROLL ────────────────────────────────
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('compact',window.scrollY>60);
});

// ─── HAMBURGER ─────────────────────────────────
const ham=document.getElementById('hamburger');
const mob=document.getElementById('mobMenu');
ham.addEventListener('click',()=>{
  ham.classList.toggle('active');
  mob.classList.toggle('open');
  document.body.style.overflow=mob.classList.contains('open')?'hidden':'';
});
document.querySelectorAll('.mob-link,.mob-resume').forEach(l=>{
  l.addEventListener('click',()=>{
    ham.classList.remove('active');
    mob.classList.remove('open');
    document.body.style.overflow='';
  });
});

// ─── REVEAL ON SCROLL ──────────────────────────
const revEls=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('shown'),i*60);
      obs.unobserve(e.target);
    }
  });
},{threshold:.12});
revEls.forEach(el=>obs.observe(el));

// ─── CARD MOUSE GLOW ───────────────────────────
document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',(e.clientX-r.left)+'px');
    card.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});

// ─── SMOOTH ACTIVE NAV ─────────────────────────
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
const secObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l=>l.style.color='');
      const active=document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if(active)active.style.color='var(--text)';
    }
  });
},{threshold:.4});
sections.forEach(s=>secObs.observe(s));