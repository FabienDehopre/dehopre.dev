import type { ComponentFixture } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';

import { DesktopNavigation } from './desktop-navigation';

describe('desktopNavigation', () => {
  let component: DesktopNavigation;
  let fixture: ComponentFixture<DesktopNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
