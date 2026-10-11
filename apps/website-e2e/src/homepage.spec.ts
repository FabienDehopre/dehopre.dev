import { expect, test } from '@playwright/test';

test('show the title and description', async ({ page }) => {
  await page.goto('/');

  expect(await page.getByTestId('pageTitle').innerText()).toContain('Fullstack developer (Angular, ASP.NET Web API)');
  expect(await page.getByTestId('pageDescription').innerText()).toContain('I\'m Fabien Dehopré, a fullstack developer using Angular and ASP.NET Core Web API. I am a consultant at Satellit srl as a Senior Fullstack Developer and expert Angular Developer.');
});

test('show the Featured Projects with a link to the Projects page', async ({ page }) => {
  await page.goto('/');

  const featuredProjects = page.getByRole('region', { name: 'Featured Projects' });
  await expect(featuredProjects.getByTestId('projectCard')).toContainText(['FordConnectToAbrpSync']);
  await featuredProjects.getByRole('link', { name: 'See all projects' }).click();

  await expect(page).toHaveURL(/\/projects$/);
});
