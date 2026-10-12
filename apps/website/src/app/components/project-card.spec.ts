import type { Project } from '../../models/project';

import { render, screen, within } from '@testing-library/angular';

import { aProject } from '../../testing/project';
import { ProjectCard } from './project-card';

/**
 * Renders a Project card with already-loaded Project data.
 * @param project the Project to show
 * @param headingLevel the heading level of the card title, when not the default
 */
async function renderCard(project: Project, headingLevel?: 2 | 3) {
  return render(ProjectCard, { inputs: headingLevel === undefined ? { project } : { project, headingLevel } });
}

describe(ProjectCard.name, () => {
  test('the card is one link named after the Project, leading to the repository when there is no homepage', async () => {
    await renderCard(aProject({ name: 'game-of-life', repositoryUrl: 'https://github.com/FabienDehopre/game-of-life' }));

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('https://github.com/FabienDehopre/game-of-life');
    expect(screen.getByRole('link', { name: 'game-of-life' })).toBe(links[0]);
  });

  test('leads to the homepage and adds a separate GitHub link when the Project has a homepage', async () => {
    await renderCard(aProject({ name: 'my-netatmo-24', homepage: 'https://netatmo.dehopre.dev', repositoryUrl: 'https://github.com/FabienDehopre/my-netatmo-24' }));

    expect(screen.getByRole('link', { name: 'my-netatmo-24' }).getAttribute('href')).toBe('https://netatmo.dehopre.dev');
    expect(screen.getByRole('link', { name: 'my-netatmo-24 on GitHub' }).getAttribute('href')).toBe('https://github.com/FabienDehopre/my-netatmo-24');
  });

  test('shows the description and the languages', async () => {
    await renderCard(aProject({ description: 'Conway\'s Game of Life', languages: ['TypeScript', 'HTML'] }));

    expect(screen.getByText('Conway\'s Game of Life')).toBeTruthy();
    const languages = within(screen.getByRole('list', { name: 'Languages' })).getAllByRole('listitem');
    expect(languages.map((language) => language.textContent.trim())).toEqual(['TypeScript', 'HTML']);
  });

  test('shows no empty description when the Project has none', async () => {
    await renderCard(aProject({ description: '' }));

    expect(screen.queryByTestId('projectDescription')).toBeNull();
  });

  test('titles the card with a level-2 heading by default', async () => {
    await renderCard(aProject({ name: 'game-of-life' }));

    expect(screen.getByRole('heading', { level: 2, name: 'game-of-life' })).toBeTruthy();
  });

  test('titles the card with the given heading level', async () => {
    await renderCard(aProject({ name: 'game-of-life' }), 3);

    expect(screen.getByRole('heading', { level: 3, name: 'game-of-life' })).toBeTruthy();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  });

  test('shows no language list when the Project has no languages', async () => {
    await renderCard(aProject({ languages: [] }));

    expect(screen.queryByRole('list', { name: 'Languages' })).toBeNull();
  });

  test('shows an Archived label only for an archived Project', async () => {
    const { rerender } = await renderCard(aProject({ archived: false }));
    expect(screen.queryByText('Archived')).toBeNull();

    await rerender({ inputs: { project: aProject({ archived: true }) } });
    expect(screen.getByText('Archived')).toBeTruthy();
  });

  test('shows the logo when the Project has one', async () => {
    await renderCard(aProject({ logo: '/images/projects/game-of-life.svg' }));

    expect(screen.getByTestId('projectLogo').getAttribute('src')).toContain('/images/projects/game-of-life.svg');
    expect(screen.queryByTestId('projectLogoFallback')).toBeNull();
  });

  test('shows a generic icon instead of a logo when the Project has none', async () => {
    await renderCard(aProject());

    expect(screen.queryByTestId('projectLogo')).toBeNull();
    expect(screen.getByTestId('projectLogoFallback')).toBeTruthy();
  });
});
