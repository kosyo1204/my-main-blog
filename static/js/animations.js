/**
 * animations.js - スクロール連動アニメーション
 * 
 * Purpose: Intersection Observer API を使用して、
 *          要素がビューポートに入ったときにアニメーションを適用
 * 
 * Usage: base.njk で <script src="/js/animations.js" defer></script> で読み込み
 * 
 * Expected: 
 *   - .animate-on-scroll クラスを持つ要素が表示されたら .animate-in を追加
 *   - h2, h3 見出しに自動適用
 *   - 60fps で滑らかに動作
 *   - prefers-reduced-motion では無効化
 */

(function() {
  'use strict';
  
  // prefers-reduced-motion が有効な場合は何もしない
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }
  
  // Intersection Observer のオプション
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Observer のコールバック
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // 一度アニメーションしたら監視を解除（パフォーマンス向上）
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Observer を作成
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // DOMContentLoaded 後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
  
  function initAnimations() {
    // .animate-on-scroll クラスを持つ要素を監視
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // h2, h3 見出しを自動的に監視対象に追加
    const headings = document.querySelectorAll('main h2, main h3');
    headings.forEach(heading => {
      if (!heading.classList.contains('animate-in')) {
        heading.classList.add('animate-on-scroll');
        observer.observe(heading);
      }
    });
  }
})();
