import type { ComponentFixture } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Menu } from '../../../../services/menu';
import { MobileNavigation } from './mobile-navigation';

describe(MobileNavigation.name, () => {
  let component: MobileNavigation;
  let fixture: ComponentFixture<MobileNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavigation],
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

    fixture = TestBed.createComponent(MobileNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
