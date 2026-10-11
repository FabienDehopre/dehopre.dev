import type { Projects } from '../../../models/project';

import { TestBed } from '@angular/core/testing';

import { aProject } from '../../../testing/project';
import ProjectsPage from './projects.page';

const PROJECTS: Projects = [
  aProject({
    name: 'triple-yahtzee-score-board',
    description: 'Best scoring line for a dice roll.',
    languages: ['TypeScript', 'HTML'],
    homepage: 'https://yahtzee.dehopre.dev',
    repositoryUrl: 'https://github.com/FabienDehopre/triple-yahtzee-score-board',
  }),
  aProject({ name: 'game-of-life', description: 'Conway\'s Game of Life', archived: true }),
];

/**
 * Renders the Projects page with already-loaded Project data.
 * @param projects the Projects passed by the route resolver
 */
async function renderProjectsPage(projects: Projects): Promise<HTMLElement> {
  await TestBed.configureTestingModule({ imports: [ProjectsPage] }).compileComponents();
  const fixture = TestBed.createComponent(ProjectsPage);
  fixture.componentRef.setInput('projects', projects);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe(ProjectsPage.name, () => {
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

  test('each card is the full Project card: description, languages, links and Archived label', async () => {
    const view = await renderProjectsPage(PROJECTS);

    const [withHomepage, archived] = view.querySelectorAll('[data-testid="projectCard"]');
    expect(withHomepage.textContent).toContain('Best scoring line for a dice roll.');
    expect(withHomepage.textContent).toContain('HTML');
    expect([...withHomepage.querySelectorAll('a')].map((link) => link.getAttribute('href'))).toEqual([
      'https://yahtzee.dehopre.dev',
      'https://github.com/FabienDehopre/triple-yahtzee-score-board',
    ]);
    expect(archived.textContent).toContain('Archived');
  });
});
