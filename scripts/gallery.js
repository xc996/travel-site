// 中文函数注释：实现画廊滑动与导航控制，包含分页点与居中箭头
function initGallery() {
  const gallery = document.querySelector('.gallery');
  const track = document.querySelector('.gallery-track');
  const prev = document.querySelector('.gallery .prev');
  const next = document.querySelector('.gallery .next');
  if (!gallery || !track || !prev || !next) return;

  const items = Array.from(track.querySelectorAll('.gallery-item'));
  let index = 0;

  // 中文函数注释：滚动到指定索引并更新导航状态
  function goTo(i) {
    index = Math.max(0, Math.min(items.length - 1, i));
    const el = items[index];
    track.scrollTo({ left: el.offsetLeft - track.offsetLeft - 16, behavior: 'smooth' });
    updateNav();
    updateDots();
  }

  // 中文函数注释：更新上下箭头可用状态
  function updateNav() {
    prev.disabled = index <= 0;
    next.disabled = index >= items.length - 1;
  }

  // 中文函数注释：创建并更新分页点
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'gallery-dots';
  const dots = items.map((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot';
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });
  gallery.appendChild(dotsWrap);

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  // 中文函数注释：根据当前滚动位置估算活动索引
  function syncIndex() {
    const left = track.scrollLeft;
    let nearest = 0;
    let min = Infinity;
    items.forEach((el, i) => {
      const dist = Math.abs(left - (el.offsetLeft - track.offsetLeft));
      if (dist < min) { min = dist; nearest = i; }
    });
    if (nearest !== index) { index = nearest; updateNav(); updateDots(); }
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  // 中文函数注释：键盘左右键控制
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });

  // 中文函数注释：滚动时同步索引，高性能节流
  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { syncIndex(); ticking = false; });
  }, { passive: true });

  // 中文函数注释：初始化到第一个项目
  updateNav();
  updateDots();
}

// 中文函数注释：模块初始化入口
document.addEventListener('DOMContentLoaded', initGallery);
