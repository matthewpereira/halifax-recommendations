const lb = document.getElementById('lb'), img = lb.querySelector('img');
let set = [], i = 0;
const show = n => { i = (n + set.length) % set.length; img.src = set[i].href; img.alt = set[i].querySelector('img').alt; };
document.querySelectorAll('.strip').forEach(strip => {
  const links = [...strip.querySelectorAll('a')];
  links.forEach((a, n) => a.addEventListener('click', e => {
    e.preventDefault(); set = links; show(n); lb.showModal();
  }));
});
lb.querySelector('.x').onclick = () => lb.close();
lb.querySelector('.prev').onclick = () => show(i - 1);
lb.querySelector('.next').onclick = () => show(i + 1);
lb.addEventListener('click', e => { if (e.target === lb || e.target === img) lb.close(); });
document.addEventListener('keydown', e => {
  if (!lb.open) return;
  if (e.key === 'ArrowLeft') show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});
let x0 = null;
lb.addEventListener('touchstart', e => x0 = e.touches[0].clientX, {passive: true});
lb.addEventListener('touchend', e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0; x0 = null;
  if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
});
