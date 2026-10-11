import type { Projects as ProjectList } from '../../../models/project';

import { TestBed } from '@angular/core/testing';

import Projects from './projects.page';

const PROJECTS: ProjectList = [
  { name: 'triple-yahtzee-score-board', description: 'Best scoring line for a dice roll.', url: 'https://github.com/FabienDehopre/triple-yahtzee-score-board' },
  { name: 'game-of-life', description: 'Conway\'s Game of Life', url: 'https://github.com/FabienDehopre/game-of-life' },
];

/**
 * Renders the Projects page with already-loaded Project data.
 * @param projects the Projects passed by the route resolver
 */
async function renderProjectsPage(projects: ProjectList): Promise<HTMLElement> {
  await TestBed.configureTestingModule({ imports: [Projects] }).compileComponents();
  const fixture = TestBed.createComponent(Projects);
  fixture.componentRef.setInput('projects', projects);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe(Projects.name, () => {
  test('shows a title and an intro', async () => {
    const view = await renderProjectsPage(PROJECTS);

    expect(view.querySelector('h1')?.textContent).toContain('Things I\'ve made');
    expect(view.querySelector('[data-testid="pageDescription"]')?.textContent.trim()).not.toBe('');
  });

  test('shows one card per Project, in list order', async () => {
    const view = await renderProjectsPage(PROJECTS);

    const cards = [...view.querySelectorAll('[data-testid="projectCard"]')];
    expect(cards.map((card) => card.querySelector('h2')?.textContent.trim())).toEqual(['triple-yahtzee-score-board', 'game-of-life']);
  });

  test('each card shows the Project description and links to its repository', async () => {
    const view = await renderProjectsPage(PROJECTS);

    const card = view.querySelector('[data-testid="projectCard"]');
    expect(card?.textContent).toContain('Best scoring line for a dice roll.');
    expect(card?.querySelector('a')?.getAttribute('href')).toBe('https://github.com/FabienDehopre/triple-yahtzee-score-board');
  });
});
