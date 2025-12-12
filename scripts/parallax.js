// 中文函数注释：为带 data-parallax 的区块添加滚动视差效果
function initParallax() {
  // 中文函数注释：使用 IntersectionObserver 结合 scroll 计算，避免 iOS 背景固定兼容问题
  const items = document.querySelectorAll('[data-parallax]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add('parallax-active');
    });
  }, { threshold: 0.1 });
  items.forEach(i => obs.observe(i));

  window.addEventListener('scroll', () => {
    items.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.2');
      const rect = el.getBoundingClientRect();
      const offset = rect.top - window.innerHeight / 2;
      el.querySelector('.hero-bg')?.style.setProperty('transform', `translateY(${offset * speed}px)`);
    });
  }, { passive: true });
}

// 中文函数注释：模块初始化入口
document.addEventListener('DOMContentLoaded', initParallax);

