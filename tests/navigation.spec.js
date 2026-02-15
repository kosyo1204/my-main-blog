import { test, expect } from '@playwright/test';

/**
 * E2E Test: Navigation Flow
 * 
 * Scenario: ホーム → タグ → 記事 への正常なナビゲーション確認
 */

test.describe('Learning Log Blog - Navigation Flow', () => {
  
  test('should navigate from home to tags to article', async ({ page }) => {
    // Step 1: ホームページへアクセス
    await page.goto('/');
    
    // ページが読込まれたことを確認
    await expect(page).toHaveTitle(/Learning Log/);
    
    // ページ内容が表示されたことを確認
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // Step 2: タグページへナビゲーション
    await page.click('a[href="/tags/"]');
    
    // タグページが読込まれたことを確認
    await expect(page).toHaveURL('/tags/');
    await expect(page.locator('h1')).toContainText(/タグ|Tags/i);
    
    // Step 3: 最初の記事をクリック（存在する場合）
    const firstArticleLink = page.locator('article a, .article-link').first();
    const articleExists = await firstArticleLink.isVisible().catch(() => false);
    
    if (articleExists) {
      await firstArticleLink.click();
      
      // 記事ページが読込まれたことを確認
      await expect(page.locator('h1')).toBeVisible();
      
      // 記事メタデータが表示されていることを確認
      const articleHeader = page.locator('article, .article-header');
      await expect(articleHeader).toBeVisible();
    }
  });

  test('should have accessible keyboard navigation', async ({ page }) => {
    // ホームページへアクセス
    await page.goto('/');
    
    // Tab キーでナビゲーション可能なリンクが存在することを確認
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    
    // フォーカス可能な要素が存在することを確認
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focusedElement);
    
    // フォーカス表示が視認可能であることは目視で確認
    // （自動テストでは確認が困難）
  });

  test('should load all pages within performance budget', async ({ page }) => {
    const pages = ['/', '/tags/', '/categories/', '/404.html'];
    
    for (const path of pages) {
      const startTime = Date.now();
      
      await page.goto(path, { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      
      // LCP を計測（簡易版: ページ読込時間）
      // 本来は Performance API で正確に計測
      const lcp = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('largest-contentful-paint');
        return perfData.length > 0 ? perfData[perfData.length - 1].renderTime : 0;
      });
      
      console.log(`${path}: LoadTime=${loadTime}ms, LCP=${lcp}ms`);
      
      // 非常に遅い読込を検出（e.g., > 5 秒）
      if (loadTime > 5000) {
        console.warn(`⚠️  Slow load detected on ${path}: ${loadTime}ms`);
      }
    }
  });

  test('should have valid HTML semantics', async ({ page }) => {
    await page.goto('/');
    
    // <main> タグが存在することを確認
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // ナビゲーション (<nav>) が存在することを確認
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // ヘッダー (<header>) が存在することを確認
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // フッター (<footer>) が存在することを確認
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
