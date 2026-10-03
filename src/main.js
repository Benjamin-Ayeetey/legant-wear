import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import solar from './icons.json';

gsap.registerPlugin(ScrollTrigger);
const $ = (selector) => document.querySelector(selector);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis;
document.querySelectorAll('[data-icon]').forEach(el => {
  const icon = solar.icons[el.dataset.icon];
  if (icon) el.innerHTML = `<svg viewBox="0 0 ${icon.width || 24} ${icon.height || 24}" fill="none" aria-hidden="true">${icon.body}</svg>`;
});
const photos = {
  'campaign-cover': 'Campaign portrait in an ivory wrap with statement jewellery.',
  'campaign-seated': 'Seated campaign portrait framed by warm brown drapery.',
  'campaign-close': 'Close campaign portrait showing ivory texture and pink jewellery.',
  'campaign-profile': 'Profile portrait with statement earrings and textured ivory fabric.',
  'campaign-smile': 'Joyful campaign portrait, smiling while adjusting earrings.'
};
document.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
  img.parentElement.classList.add('media-failed');
  img.style.opacity = '0';
}));
const campaign = ['campaign-cover', 'campaign-smile', 'campaign-profile'];
let campaignIndex = 0;
function changeCampaign(delta) {
  campaignIndex = (campaignIndex + delta + campaign.length) % campaign.length;
  const img = $('#hero-image');
  const key = campaign[campaignIndex];
  img.src = `/media/${key}-1600.webp`;
  img.srcset = `/media/${key}-800.webp 800w, /media/${key}-1600.webp 1600w`;
  img.alt = photos[key];
  $('.campaign-count').textContent = `0${campaignIndex + 1} / 03`;
  if (!reduced()) gsap.fromTo(img, { opacity: .55, scale: 1.035 }, { opacity: 1, scale: 1, duration: .8, overwrite: true });
}
$('.campaign-prev').addEventListener('click', () => changeCampaign(-1));
$('.campaign-next').addEventListener('click', () => changeCampaign(1));
const occasions = {
  Office: ['campaign-seated', 'THE OFFICE / 01', 'Make room for your ambition. Let’s find a look that feels like you.', 'Find my office look'],
  Outings: ['campaign-smile', 'OUT & ABOUT / 02', 'A little ease. A little expression. Tell us where the day takes you.', 'Find my outing look'],
  'Beauty shows': ['campaign-close', 'THE SPOTLIGHT / 03', 'Your moment in the spotlight starts with how you feel. Let’s make it personal.', 'Find my spotlight look'],
  Parties: ['campaign-profile', 'AFTER HOURS / 04', 'An invitation to express yourself. Let’s find your look for the evening.', 'Find my party look']
};
document.querySelectorAll('.occasion-button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.occasion-button').forEach(other => { other.classList.toggle('active', other === button); other.setAttribute('aria-pressed', String(other === button)); });
  const [photo, caption, copy, cta] = occasions[button.dataset.occasion];
  const img = $('#occasion-image');
  img.src = `/media/${photo}-800.webp`; img.alt = photos[photo];
  $('.occasion-selected').textContent = caption; $('.occasion-copy').textContent = copy;
  $('.occasion-cta').firstChild.textContent = `${cta} `;
  $('select[name="occasion"]').value = button.dataset.occasion;
  if (!reduced()) gsap.fromTo(img, { opacity: .45, y: 12 }, { opacity: 1, y: 0, duration: .55, overwrite: true });
}));
const menu = $('#mobile-menu');
const toggle = $('.menu-toggle');
function setMenu(open) {
  menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  if (open) { lenis?.stop(); menu.querySelector('a').focus(); }
  else { lenis?.start(); toggle.focus({preventScroll:true}); }
}
toggle.addEventListener('click', () => setMenu(menu.hidden));
document.addEventListener('keydown', event => {
  if (menu.hidden) return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const items = [toggle, ...menu.querySelectorAll('a')];
    const index = items.indexOf(document.activeElement);
    if (event.shiftKey && index === 0) { event.preventDefault(); items.at(-1).focus(); }
    if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); toggle.focus(); }
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault(); if (!menu.hidden) setMenu(false);
  if (lenis) lenis.scrollTo(target); else target.scrollIntoView({behavior: reduced() ? 'instant' : 'smooth'});
  history.replaceState(null, '', link.hash);
  target.setAttribute('tabindex', '-1'); target.focus({preventScroll:true});
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => lenis?.start());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
document.querySelectorAll('.lookbook-photo').forEach(button => button.addEventListener('click', () => {
  const dialog = $('.photo-dialog'); const img = dialog.querySelector('img');
  img.src = `/media/${button.dataset.photo}-1600.webp`; img.alt = photos[button.dataset.photo];
  dialog.querySelector('p').textContent = button.dataset.caption;
  dialog.showModal(); lenis?.stop();
}));
let request = '';
$('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  request = `LEGANT WEAR — STYLING ENQUIRY\n\nName: ${fields.get('name').trim()}\nEmail: ${fields.get('email').trim()}\nOccasion: ${fields.get('occasion')}\n\n${fields.get('message').trim()}`;
  $('#request-summary').textContent = request;
  $('#copy-status').textContent = '';
  $('#email-request').href = `mailto:hello@legantwear.example?subject=${encodeURIComponent('My Legant Wear styling enquiry')}&body=${encodeURIComponent(request)}`;
  $('.enquiry-dialog').showModal(); lenis?.stop();
});
// Failed JavaScript leaves the form inert, preventing input from entering a URL.
$('#enquiry-fields').disabled = false;
$('#copy-request').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(request); $('#copy-status').textContent = 'Enquiry copied. Ready to share.'; }
  catch { const range = document.createRange(); range.selectNodeContents($('#request-summary')); getSelection().removeAllRanges(); getSelection().addRange(range); $('#copy-status').textContent = 'Select and copy the highlighted enquiry.'; }
});
$('#download-request').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([request], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'legant-wear-enquiry.txt'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('#year').textContent = new Date().getFullYear();
// Preserve meaningful inline markup; only plain headings receive decorative word splitting.
document.querySelectorAll('.reveal-heading').forEach(heading => {
  heading.setAttribute('aria-label', heading.textContent);
  const decorative = document.createElement('span'); decorative.setAttribute('aria-hidden', 'true');
  decorative.innerHTML = heading.innerHTML;
  const walker = document.createTreeWalker(decorative, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) if (!walker.currentNode.parentElement.closest('em')) nodes.push(walker.currentNode);
  nodes.forEach(node => {
  const fragment = document.createDocumentFragment();
  node.textContent.split(/(\s+)/).forEach(word => {
    if (!word.trim()) fragment.append(document.createTextNode(word));
    else { const mask = document.createElement('span'); mask.className = 'word-mask'; const inner = document.createElement('span'); inner.className = 'split-word'; inner.textContent = word; mask.append(inner); fragment.append(mask); }
  });
  node.replaceWith(fragment);
  });
  heading.replaceChildren(decorative);
});
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  lenis = new Lenis({duration:1.05, smoothWheel:true});
  const tick = time => lenis?.raf(time * 1000);
  lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(tick);
  const intro = gsap.timeline({defaults:{ease:'power3.out'}});
  intro.from('.hero-copy > *', {y:24, opacity:.2, stagger:.12, duration:1}, .1)
    .from('.hero-brand', {y:60, opacity:.5, duration:1.3}, .2)
    .from('.hero-media img', {scale:1.06, duration:1.7}, 0);
  document.querySelectorAll('.reveal-heading').forEach(heading => {
    const words = heading.querySelectorAll('.split-word');
    gsap.from(words.length ? words : heading, {y:words.length ? 60 : 28, opacity:.15, duration:.9, stagger:.055, scrollTrigger:{trigger:heading,start:'top 90%',once:true}});
  });
  document.querySelectorAll('.story-image,.lookbook-photo,.occasion-preview,.manifesto-bottom').forEach(el => gsap.from(el, {y:35, opacity:.25, duration:1, scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
  gsap.to('.editorial-image', {yPercent:5, ease:'none', scrollTrigger:{trigger:'.editorial',start:'top bottom',end:'bottom top',scrub:true}});
  return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = undefined; };
});
document.fonts.ready.then(() => ScrollTrigger.refresh());
document.querySelectorAll('img').forEach(img => img.addEventListener('load', () => ScrollTrigger.refresh()));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) lenis?.stop();
  else if (menu.hidden && !document.querySelector('dialog[open]')) lenis?.start();
});
window.addEventListener('pagehide', event => { if (!event.persisted) mm.revert(); });

