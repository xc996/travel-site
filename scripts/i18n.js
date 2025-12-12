// 中文函数注释：初始化语言并提供切换逻辑，加载对应 JSON 文案并注入页面
export function getLanguage() {
  // 中文函数注释：获取当前语言，优先 localStorage，其次浏览器语言，最终默认中文
  const stored = localStorage.getItem('lang');
  if (stored) return stored;
  const nav = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}

export async function loadTranslations(lang) {
  // 中文函数注释：加载指定语言的 JSON 文本资源
  const res = await fetch(`i18n/${lang}.json`);
  return res.json();
}

export function applyTranslations(dict) {
  // 中文函数注释：遍历带 data-i18n 的元素，按键路径从字典取值并填充
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(node => {
    const key = node.getAttribute('data-i18n');
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') node.textContent = value;
  });
}

let currentLang = null;
let currentDict = null;

export async function setLanguage(lang) {
  // 中文函数注释：设置语言到 localStorage，如语言未变化则复用已有字典；否则重新加载并应用
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
  if (currentLang === lang && currentDict) {
    applyTranslations(currentDict);
    return;
  }
  currentLang = lang;
  currentDict = await loadTranslations(lang);
  applyTranslations(currentDict);
  document.documentElement.classList.add('i18n-ready');
}

export function reapplyTranslations() {
  // 中文函数注释：在交互后重新应用当前字典，解决局部刷新导致的文案闪烁
  if (currentDict) applyTranslations(currentDict);
}

export function getCurrentDict() {
  // 中文函数注释：返回当前已加载的字典对象
  return currentDict;
}

// 中文函数注释：页面加载后初始化语言与切换按钮事件
document.addEventListener('DOMContentLoaded', async () => {
  const lang = getLanguage();
  await setLanguage(lang);
  document.querySelectorAll('.lang-switch [data-lang]')?.forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = btn.getAttribute('data-lang');
      await setLanguage(target);
    });
  });
});

// 中文函数注释：将常用方法暴露到全局，供页面交互脚本调用
// 仅用于静态站点环境，便于在切换标签或懒加载后重新应用文案
// 不建议在大型应用中使用全局暴露方式
// eslint-disable-next-line no-undef
window.I18N = { setLanguage, getLanguage, reapply: reapplyTranslations, getDict: getCurrentDict };
