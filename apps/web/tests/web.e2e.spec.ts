import { test, expect } from '@playwright/test';

test.describe('Web E2E - mock mode', () => {
  test('login gets token and dashboard hits health and secure endpoints', async ({ page }) => {
    const base = process.env.WEB_BASE_URL || 'http://localhost:3001';
    await page.goto(`${base}/login`);

    // Fill login with manager
    await page.fill('input[type="text"]', 'manager');
    await page.fill('input[type="password"]', 'any');
    await page.click('button:has-text("Login")');

    // Token displayed
    await expect(page.locator('text=Token')).toBeVisible();
    const tokenBox = page.locator('div.bg-gray-100.border.rounded');
    const tokenText = await tokenBox.textContent();
    expect(tokenText && tokenText.length).toBeGreaterThan(10);

    // Navigate to dashboard
    await page.goto(`${base}/dashboard`);

    // Paste token
    await page.fill('input', tokenText || '');

    // Fetch /health
    await page.click('button:has-text("/health")');
    await expect(page.locator('text=/\\"status\\": \\"ok\\"/')).toBeVisible();

    // Fetch /health/secure - manager allowed
    await page.click('button:has-text("/health/secure")');
    await expect(page.locator('text=/\\"status\\": \\"ok-secure\\"/')).toBeVisible();
  });

  test('inspector is denied for secure endpoint', async ({ page }) => {
    const base = process.env.WEB_BASE_URL || 'http://localhost:3001';
    await page.goto(`${base}/login`);

    // Login as inspector
    await page.fill('input[type="text"]', 'inspector');
    await page.fill('input[type="password"]', 'any');
    await page.click('button:has-text("Login")');

    // Capture token
    const tokenBox = page.locator('div.bg-gray-100.border.rounded');
    const tokenText = await tokenBox.textContent();

    // Dashboard
    await page.goto(`${base}/dashboard`);
    await page.fill('input', tokenText || '');

    // Secure fetch should show non-200 response in panel
    await page.click('button:has-text("/health/secure")');
    await expect(page.locator('text=/\\"error\\": true/')).toBeVisible();
    await expect(page.locator('text=/\\"status\\": 403/')).toBeVisible();
  });
});