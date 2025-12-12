// 中文函数注释：页面通用初始化逻辑，包括图片懒加载与进入动画优化
function initPage() {
  // 中文函数注释：为可见区域的卡片触发进入动画，提高首屏展示
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.card')?.forEach(c => io.observe(c));
}

// 中文函数注释：模块初始化入口
document.addEventListener('DOMContentLoaded', initPage);

