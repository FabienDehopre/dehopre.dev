import type {
  ElementRef } from '@angular/core';

import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component, DestroyRef,
  DOCUMENT,
  inject, input, output, Renderer2,
  signal, untracked, viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { Theme } from '../../../services/theme';
import { Container } from '../../container/container';
import { Avatar } from './avatar/avatar';
import { AvatarContainer } from './avatar/avatar-container';
import { DesktopNavigation } from './desktop-navigation/desktop-navigation';
import { MobileNavigation } from './mobile-navigation/mobile-navigation';
import { ThemeToggle } from './theme-toggle/theme-toggle';

/**
 *
 * @param num
 * @param a
 * @param b
 */
function clamp(num: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(num, min), max);
}

@Component({
  selector: 'app-header',
  imports: [Avatar, ThemeToggle, MobileNavigation, DesktopNavigation, Container, AvatarContainer],
  template: `
    <header
      class="pointer-events-none relative z-50 flex flex-none flex-col"
      [style.height]="'var(--header-height)'"
      [style.margin-bottom]="'var(--header-mb)'"
    >
      @if (isHomePage()) {
        <div #avatar class="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"></div>
        <app-container cssClass="top-0 order-last -mb-3 pt-3" [cssStyles]="{ position: 'var(--header-position)' }">
          <div class="top-(--avatar-top,--spacing(3)) w-full" [style.position]="'var(--header-inner-position)'">
            <div class="relative">
              <app-avatar-container
                cssClass="absolute top-3 left-0 origin-left transition-opacity"
                [cssStyles]="{ opacity: 'var(--avatar-border-opacity, 0)', transform: 'var(--avatar-border-transform)' }"
              />
              <app-avatar
                cssClass="block h-16 w-16 origin-left"
                large
                [cssStyles]="{ transform: 'var(--avatar-image-transform)' }"
              />
            </div>
          </div>
        </app-container>
      }
      <div #header class="top-0 z-10 h-16 pt-6" [style.position]="'var(--header-position)'">
        <app-container
          cssClass="top-(--header-top,--spacing(6)) w-full"
          [cssStyles]="{ position: 'var(--header-inner-position)' }"
        >
          <div class="relative flex gap-4">
            <div class="flex flex-1">
              @if (!isHomePage()) {
                <app-avatar-container>
                  <app-avatar />
                </app-avatar-container>
              }
            </div>
            <div class="
              flex flex-1 justify-end
              md:justify-center
            ">
              <app-mobile-navigation class="
                pointer-events-auto block
                md:hidden
              " />
              <app-desktop-navigation class="
                pointer-events-auto hidden
                md:block
              " />
            </div>
            <div class="
              flex justify-end
              md:flex-1
            ">
              <div class="pointer-events-auto">
                <app-theme-toggle [theme]="theme()" (setTheme)="setTheme.emit($event)" />
              </div>
            </div>
          </div>
        </app-container>
      </div>
    </header>
    @if (isHomePage()) {
      <div class="flex-none" [style.height]="'var(--content-offset)'"></div>
    }
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private rafId: number | undefined;
  private readonly router = inject(Router);
  private readonly themeService = inject(Theme);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly isInitial = signal(true);
  protected readonly isHomePage = toSignal(this.router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.router.url === '/')), { initialValue: false });

  readonly headerRef = viewChild.required<ElementRef<HTMLDivElement>>('header');
  readonly avatarRef = viewChild<ElementRef<HTMLDivElement>>('avatar');
  readonly theme = input.required<'dark' | 'light'>();
  readonly setTheme = output<'dark' | 'light'>();

  constructor() {
    afterRenderEffect({
      write: (onCleanup) => {
        this.isHomePage();
        untracked(() => {
          const updateStyles = this.updateStyles.bind(this);
          updateStyles();
          if (this.document.defaultView) {
            const unregisterScrollListener = this.renderer.listen(this.document.defaultView, 'scroll', updateStyles, { passive: true });
            const unregisterResizeListener = this.renderer.listen(this.document.defaultView, 'resize', updateStyles);
            onCleanup(() => {
              unregisterScrollListener();
              unregisterResizeListener();
            });
          }
        });
      },
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.rafId) {
        this.document.defaultView?.cancelAnimationFrame(this.rafId);
      }
    });
  }

  private updateStyles() {
    if (this.rafId) {
      return;
    }

    this.rafId = this.document.defaultView?.requestAnimationFrame(() => {
      this.updateHeaderStyles();
      this.updateAvatarStyles();
      this.isInitial.set(false);
      this.rafId = undefined;
    });
  }

  private updateHeaderStyles() {
    const downDelay = this.avatarRef()?.nativeElement.offsetTop ?? 0;
    const upDelay = 64;
    const headerRef = this.headerRef().nativeElement;
    const { top, height } = headerRef.getBoundingClientRect();
    const scrollY = clamp(
      this.document.defaultView?.scrollY ?? 0,
      0,
      this.document.body.scrollHeight - (this.document.defaultView?.innerHeight ?? 0)
    );

    if (this.isInitial()) {
      this.themeService.setProperty('--header-position', 'sticky');
    }

    this.themeService.setProperty('--content-offset', `${downDelay}px`);

    if (this.isInitial() || scrollY < downDelay) {
      this.themeService.setProperty('--header-height', `${downDelay + height}px`);
      this.themeService.setProperty('--header-mb', `${-downDelay}px`);
    } else if (top + height < -upDelay) {
      const offset = Math.max(height, scrollY - upDelay);
      this.themeService.setProperty('--header-height', `${offset}px`);
      this.themeService.setProperty('--header-mb', `${height - offset}px`);
    } else if (top === 0) {
      this.themeService.setProperty('--header-height', `${scrollY + height}px`);
      this.themeService.setProperty('--header-mb', `${-scrollY}px`);
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      this.themeService.setProperty('--header-inner-position', 'fixed');
      this.themeService.removeProperty('--header-top');
      this.themeService.removeProperty('--avatar-top');
    } else {
      this.themeService.removeProperty('--header-inner-position');
      this.themeService.setProperty('--header-top', '0px');
      this.themeService.setProperty('--avatar-top', '0px');
    }
  }

  private updateAvatarStyles() {
    if (!this.isHomePage()) {
      return;
    }

    const downDelay = this.avatarRef()?.nativeElement.offsetTop ?? 0;
    const fromScale = 1;
    const toScale = 36 / 64;
    const fromX = 0;
    const toX = 2 / 16;

    const scrollY = downDelay - window.scrollY;

    let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
    scale = clamp(scale, fromScale, toScale);

    let x = (scrollY * (fromX - toX)) / downDelay + toX;
    x = clamp(x, fromX, toX);

    this.themeService.setProperty(
      '--avatar-image-transform',
      `translate3d(${x}rem, 0, 0) scale(${scale})`
    );

    const borderScale = 1 / (toScale / scale);
    const borderX = (-toX + x) * borderScale;
    const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

    this.themeService.setProperty('--avatar-border-transform', borderTransform);
    this.themeService.setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
  }
}
