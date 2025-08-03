import { test, expect } from '@playwright/test';

test('show the title and description', async ({ page }) => {
  await page.goto('/');

  expect(await page.getByTestId('pageTitle').innerText()).toContain('Fullstack developer (Angular, ASP.NET Web API)');
  expect(await page.getByTestId('pageDescription').innerText()).toContain('I\'m Fabien Dehopré, a fullstack developer using Angular and ASP.NET Core Web API. I am a consultant at Satellit sprl as a Senior Fullstack Developer and expert Angular Developer.');
});
