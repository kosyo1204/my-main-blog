/**
 * code-copy.js
 *
 * Purpose: コードブロックにコピーボタンを追加し、クリップボードへのコピー機能を提供
 *
 * Usage: base.njk または article.njk で <script src="/js/code-copy.js"></script> を追加
 *
 * Expected: すべての <pre><code> 要素にコピーボタンが表示され、クリック時にコードをコピー
 */

(function() {
  'use strict';

  // DOMContentLoaded イベントで初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
  } else {
    initCodeCopy();
  }

  function initCodeCopy() {
    // すべての <pre> 要素を取得
    const preElements = document.querySelectorAll('pre');

    preElements.forEach(function(pre) {
      const code = pre.querySelector('code');
      if (!code) return;

      // 既にラッパーがある場合はスキップ
      if (pre.parentNode.classList.contains('code-block-wrapper')) {
        return;
      }

      // ラッパー要素を作成
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      // pre 要素をラッパーで包む
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // コピーボタンを作成
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      // クリックイベントを追加
      button.addEventListener('click', function() {
        copyToClipboard(code.textContent, button);
      });

      wrapper.appendChild(button);
    });
  }

  function copyToClipboard(text, button) {
    // Clipboard API を使用
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function() {
          showCopiedState(button);
        })
        .catch(function(err) {
          console.error('Failed to copy:', err);
          // フォールバック: execCommand を試す
          fallbackCopy(text, button);
        });
    } else {
      // Clipboard API が利用できない場合のフォールバック
      fallbackCopy(text, button);
    }
  }

  function fallbackCopy(text, button) {
    // textarea を使用したフォールバック
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopiedState(button);
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textarea);
  }

  function showCopiedState(button) {
    // ボタンの表示を「Copied!」に変更
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    // 2秒後に元に戻す
    setTimeout(function() {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }
})();
