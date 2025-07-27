import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef, HostListener,
  inject, input, output,
  signal, viewChild
} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {filter, map} from "rxjs";
import {Avatar} from "./avatar/avatar";
import {ThemeToggle} from "./theme-toggle/theme-toggle";
import {Theme} from "../../../services/theme";
import {MobileNavigation} from "./mobile-navigation/mobile-navigation";
import {DesktopNavigation} from "./desktop-navigation/desktop-navigation";
import {Container} from "../../container/container";
import {AvatarContainer} from "./avatar/avatar-container";

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

@Component({
  selector: 'app-header',
  imports: [Avatar, ThemeToggle, MobileNavigation, DesktopNavigation, Container, AvatarContainer],
  templateUrl: './header.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly #router = inject(Router);
  readonly #theme = inject(Theme);
  readonly #document = inject(DOCUMENT);
  readonly #isInitial = signal(true);
  readonly isHomePage = toSignal(this.#router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.#router.url === '/')), { initialValue: false });
  readonly headerRef = viewChild.required<ElementRef<HTMLDivElement>>('header');
  readonly avatarRef = viewChild<ElementRef<HTMLDivElement>>('avatar');
  readonly theme = input.required<'dark' | 'light'>();
  readonly setTheme = output<'dark' | 'light'>();

  // constructor() {
  //   effect((onCleanup) => {
  //     this.isHomePage();
  //     untracked(() => {
  //       const updateStyles = this.#updateStyles.bind(this);
  //       updateStyles();
  //       const unregisterScrollListener = this.#renderer.listen(this.#document.defaultView, 'scroll', updateStyles, { passive: true });
  //       const unregisterResizeListener = this.#renderer.listen(this.#document.defaultView, 'resize', updateStyles);
  //       onCleanup(() => {
  //         unregisterScrollListener();
  //         unregisterResizeListener();
  //       });
  //     });
  //   });
  // }

  constructor() {
    afterRenderEffect({
      write: () => {
        this.isHomePage();
        this.#updateStyles();
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.#updateStyles();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.#updateStyles();
  }

  #updateStyles() {
    this.#updateHeaderStyles();
    this.#updateAvatarStyles();
    this.#isInitial.set(false);
  }

  #updateHeaderStyles() {
    const downDelay = this.avatarRef()?.nativeElement.offsetTop ?? 0;
    const upDelay = 64;
    const headerRef = this.headerRef().nativeElement;
    const { top, height } = headerRef.getBoundingClientRect();
    const scrollY = clamp(
      this.#document.defaultView!.scrollY,
      0,
      this.#document.body.scrollHeight - this.#document.defaultView!.innerHeight
    );

    if (this.#isInitial()) {
      this.#theme.setProperty('--header-position', 'sticky');
    }

    this.#theme.setProperty('--content-offset', `${downDelay}px`);

    if (this.#isInitial() || scrollY < downDelay) {
      this.#theme.setProperty('--header-height', `${downDelay + height}px`);
      this.#theme.setProperty('--header-mb', `${-downDelay}px`);
    } else if (top + height < -upDelay) {
      const offset = Math.max(height, scrollY - upDelay);
      this.#theme.setProperty('--header-height', `${offset}px`);
      this.#theme.setProperty('--header-mb', `${height - offset}px`);
    } else if (top === 0) {
      this.#theme.setProperty('--header-height', `${scrollY + height}px`);
      this.#theme.setProperty('--header-mb', `${-scrollY}px`);
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      this.#theme.setProperty('--header-inner-position', 'fixed');
      this.#theme.removeProperty('--header-top');
      this.#theme.removeProperty('--avatar-top');
    } else {
      this.#theme.removeProperty('--header-inner-position');
      this.#theme.setProperty('--header-top', '0px');
      this.#theme.setProperty('--avatar-top', '0px');
    }
  }

  #updateAvatarStyles() {
    if (!this.isHomePage()) {
      return;
    }

    const downDelay = this.avatarRef()?.nativeElement.offsetTop ?? 0;
    const fromScale = 1;
    const toScale = 36 / 64;
    const fromX = 0;
    const toX = 2 / 16;

    const scrollY = downDelay - window.scrollY

    let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
    scale = clamp(scale, fromScale, toScale)

    let x = (scrollY * (fromX - toX)) / downDelay + toX
    x = clamp(x, fromX, toX)

    this.#theme.setProperty(
      '--avatar-image-transform',
      `translate3d(${x}rem, 0, 0) scale(${scale})`,
    )

    const borderScale = 1 / (toScale / scale)
    const borderX = (-toX + x) * borderScale
    const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

    this.#theme.setProperty('--avatar-border-transform', borderTransform)
    this.#theme.setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
  }
}
