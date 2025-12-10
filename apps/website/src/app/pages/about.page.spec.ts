import type { ComponentFixture } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';

import About from './about.page';

describe(About.name, () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('meta', {
      title: 'About',
      description: 'Test about page',
    });

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
