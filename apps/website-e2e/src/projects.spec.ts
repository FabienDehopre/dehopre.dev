import { expect, test } from '@playwright/test';

test('show the curated Projects as cards', async ({ page }) => {
  await page.goto('/projects');

  await expect(page.getByTestId('pageTitle')).toContainText('Things I\'ve made');
  await expect(page.getByTestId('projectCard')).toHaveCount(6);
  await expect(page.getByTestId('projectCard').first()).toContainText('triple-yahtzee-score-board');
});

test('reach the Projects page from the navigation', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).first().click();

  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByTestId('projectCard').first()).toBeVisible();
});
