// 中文函数注释：移动端导航菜单展开/收起并添加平滑动画
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const visible = getComputedStyle(nav).display !== 'none';
    if (visible) { nav.style.display = 'none'; }
    else { nav.style.display = 'flex'; nav.classList.add('nav-enter'); setTimeout(() => nav.classList.remove('nav-enter'), 260); }
  });
}

// 中文函数注释：模块初始化入口
document.addEventListener('DOMContentLoaded', initNav);

