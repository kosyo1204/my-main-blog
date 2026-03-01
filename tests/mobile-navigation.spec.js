import { test, expect } from '@playwright/test';

/**
 * E2E Test: Mobile Navigation
 *
 * Purpose: モバイルハンバーガーメニューの動作確認
 * - ハンバーガーメニューの開閉
 * - キーボード操作（Escキー）
 * - メニュー外クリックで閉じる
 * - リンククリックでメニューが閉じる
 */

test.describe('Mobile Navigation - Hamburger Menu', () => {

  test('should show hamburger menu on mobile viewport', async ({ page }) => {
    // モバイルビューポートに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // ハンバーガーメニューボタンが表示されることを確認
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();

    // 初期状態でメニューは閉じている
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // ナビゲーションメニューが隠れていることを確認
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('should toggle menu when hamburger button is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const navMenu = page.locator('.nav-menu');

    // メニューを開く
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(navMenu).toHaveAttribute('aria-hidden', 'false');

    // メニューを閉じる
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('should close menu when Escape key is pressed', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const navMenu = page.locator('.nav-menu');

    // メニューを開く
    await menuToggle.click();
    await expect(navMenu).toHaveAttribute('aria-hidden', 'false');

    // Escキーを押す
    await page.keyboard.press('Escape');

    // メニューが閉じることを確認
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('should close menu when clicking outside', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const navMenu = page.locator('.nav-menu');

    // メニューを開く
    await menuToggle.click();
    await expect(navMenu).toHaveAttribute('aria-hidden', 'false');

    // メニュー外（メインコンテンツ）をクリック
    const mainContent = page.locator('main');
    await mainContent.click({ position: { x: 10, y: 10 } });

    // メニューが閉じることを確認
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('should close menu when navigation link is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const navMenu = page.locator('.nav-menu');

    // メニューを開く
    await menuToggle.click();
    await expect(navMenu).toHaveAttribute('aria-hidden', 'false');

    // タグリンクをクリック（pathPrefixを考慮）
    const tagsLink = navMenu.locator('a[href*="/tags/"]');
    await tagsLink.click();

    // ページが遷移することを確認（pathPrefixを考慮）
    await page.waitForURL('**/tags/', { timeout: 5000 });

    // メニューが閉じることを確認（新しいページで）
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('should hide hamburger menu on desktop viewport', async ({ page }) => {
    // デスクトップビューポートに設定
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');

    // ハンバーガーメニューボタンが非表示であることを確認
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).not.toBeVisible();

    // ナビゲーションメニューが表示されていることを確認
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toBeVisible();
  });

  test('should have accessible hamburger button with aria-label', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');

    // aria-label が設定されていることを確認
    await expect(menuToggle).toHaveAttribute('aria-label', 'メニュー');

    // aria-controls が設定されていることを確認
    await expect(menuToggle).toHaveAttribute('aria-controls', 'nav-menu');
  });

  test('should animate hamburger icon to X when opened', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const hamburgerIcon = page.locator('.hamburger-icon');

    // メニューを開く
    await menuToggle.click();

    // ハンバーガーアイコンが存在することを確認
    await expect(hamburgerIcon).toBeVisible();

    // aria-expanded が true になっていることを確認
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('should maintain navigation functionality across viewport changes', async ({ page }) => {
    await page.goto('/');

    // デスクトップで開始
    await page.setViewportSize({ width: 1024, height: 768 });
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toBeVisible();

    // モバイルにリサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();

    // メニューが正しく動作することを確認
    await menuToggle.click();
    await expect(navMenu).toHaveAttribute('aria-hidden', 'false');
  });
});
