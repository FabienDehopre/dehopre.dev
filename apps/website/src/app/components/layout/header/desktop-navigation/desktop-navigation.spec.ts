import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopNavigation } from './desktop-navigation';

describe('DesktopNavigation', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
