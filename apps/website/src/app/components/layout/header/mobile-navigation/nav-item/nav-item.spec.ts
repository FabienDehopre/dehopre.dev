import type { ComponentFixture } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NavItem } from './nav-item';

describe('navItem', () => {
  let component: NavItem;
  let fixture: ComponentFixture<NavItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItem],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({}),
            firstChild: null,
            outlet: 'primary',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItem);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('href', '/test');

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
