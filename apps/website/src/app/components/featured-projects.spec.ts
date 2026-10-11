import type { Projects } from '../../models/project';

import { provideRouter } from '@angular/router';
import { render, screen, within } from '@testing-library/angular';

import { aProject } from '../../testing/project';
import { FeaturedProjects } from './featured-projects';

/**
 * Renders the Featured Projects section with already-loaded Project data.
 * @param projects all the Projects, featured or not, in curated list order
 */
async function renderFeaturedProjects(projects: Projects) {
  return render(FeaturedProjects, { inputs: { projects }, providers: [provideRouter([])] });
}

/**
 * The names of the Project cards shown, in display order.
 */
function shownProjectNames(): string[] {
  return screen.getAllByTestId('projectCard').map((card) => within(card).getAllByRole('link')[0].textContent.trim());
}

describe(FeaturedProjects.name, () => {
  test('shows only the flagged Projects, in list order', async () => {
    await renderFeaturedProjects([
      aProject({ name: 'triple-yahtzee-score-board' }),
      aProject({ name: 'FordConnectToAbrpSync', featured: true }),
      aProject({ name: 'eslint-config' }),
      aProject({ name: 'game-of-life', featured: true }),
    ]);

    expect(shownProjectNames()).toEqual(['FordConnectToAbrpSync', 'game-of-life']);
  });

  test('shows at most three Featured Projects when more are flagged', async () => {
    await renderFeaturedProjects([
      aProject({ name: 'triple-yahtzee-score-board', featured: true }),
      aProject({ name: 'my-netatmo-24', featured: true }),
      aProject({ name: 'FordConnectToAbrpSync', featured: true }),
      aProject({ name: 'eslint-config', featured: true }),
    ]);

    expect(shownProjectNames()).toEqual(['triple-yahtzee-score-board', 'my-netatmo-24', 'FordConnectToAbrpSync']);
  });

  test('each Featured Project card links the same way as on the Projects page', async () => {
    await renderFeaturedProjects([
      aProject({ name: 'FordConnectToAbrpSync', featured: true, homepage: 'https://ford.dehopre.dev', repositoryUrl: 'https://github.com/FabienDehopre/FordConnectToAbrpSync' }),
    ]);

    expect(screen.getByRole('link', { name: 'FordConnectToAbrpSync' }).getAttribute('href')).toBe('https://ford.dehopre.dev');
    expect(screen.getByRole('link', { name: 'FordConnectToAbrpSync on GitHub' }).getAttribute('href')).toBe('https://github.com/FabienDehopre/FordConnectToAbrpSync');
  });

  test('titles each card one level below the section heading', async () => {
    await renderFeaturedProjects([aProject({ name: 'FordConnectToAbrpSync', featured: true })]);

    expect(screen.getByRole('heading', { level: 2, name: 'Featured Projects' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3, name: 'FordConnectToAbrpSync' })).toBeTruthy();
  });

  test('links to the full Projects page', async () => {
    await renderFeaturedProjects([aProject({ featured: true })]);

    expect(screen.getByRole('link', { name: /all projects/i }).getAttribute('href')).toBe('/projects');
  });
});
