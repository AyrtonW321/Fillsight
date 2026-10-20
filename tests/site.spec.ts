import { test, expect } from '@playwright/test';
test('browse from home to explorer and station profile without overflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Good fuel.');
  await expect(page.locator('.recharts-surface').first()).toBeVisible();
  await page.screenshot({ path: `/tmp/fillsight-home-${testInfo.project.name}.png`, fullPage: true });
  await page.getByRole('navigation').getByRole('link', { name: 'Explore stations' }).click();
  await page.getByRole('textbox', { name: 'Search stations or areas' }).fill('Scarborough');
  await expect(page.getByText('1 results')).toBeVisible();
  await page.getByRole('button', { name: 'Premium', exact: true }).click();
  await expect(page.getByRole('button', { name: /Select Eastway Gas/ })).toContainText('174.6');
  await page.screenshot({ path: `/tmp/fillsight-explore-${testInfo.project.name}.png`, fullPage: true });
  await page.getByRole('link', { name: 'View station details' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Eastway Gas');
  await page.getByText('View demo history as a table').click();
  await expect(page.getByRole('table')).toBeVisible();
  await page.getByRole('button', { name: '7 days' }).click();
  await expect(page.getByRole('table').getByRole('row')).toHaveCount(8);
  await page.screenshot({ path: `/tmp/fillsight-detail-${testInfo.project.name}.png`, fullPage: true });
  for (const route of ['/', '/explore', '/insights', '/about', '/stations/eastway']) {
    await page.goto(`/#${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});
