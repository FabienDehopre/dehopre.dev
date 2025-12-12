import type { ComponentFixture } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Menu } from '../../../../services/menu';
import { DesktopNavigation } from './desktop-navigation';

describe(DesktopNavigation.name, () => {
  let component: DesktopNavigation;
  let fixture: ComponentFixture<DesktopNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavigation],
      providers: [
        { provide: Menu, useValue: { getMenu: () => [] } },
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

    fixture = TestBed.createComponent(DesktopNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
