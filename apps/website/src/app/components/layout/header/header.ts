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
import {DocumentElement} from "../../../services/document-element";

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

@Component({
  selector: 'app-header',
  imports: [Avatar, ThemeToggle],
  templateUrl: './header.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly #router = inject(Router);
  readonly #documentElement = inject(DocumentElement);
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
      this.#documentElement.setProperty('--header-position', 'sticky');
    }

    this.#documentElement.setProperty('--content-offset', `${downDelay}px`);

    if (this.#isInitial() || scrollY < downDelay) {
      this.#documentElement.setProperty('--header-height', `${downDelay + height}px`);
      this.#documentElement.setProperty('--header-mb', `${-downDelay}px`);
    } else if (top + height < -upDelay) {
      const offset = Math.max(height, scrollY - upDelay);
      this.#documentElement.setProperty('--header-height', `${offset}px`);
      this.#documentElement.setProperty('--header-mb', `${height - offset}px`);
    } else if (top === 0) {
      this.#documentElement.setProperty('--header-height', `${scrollY + height}px`);
      this.#documentElement.setProperty('--header-mb', `${-scrollY}px`);
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      this.#documentElement.setProperty('--header-inner-position', 'fixed');
      this.#documentElement.removeProperty('--header-top');
      this.#documentElement.removeProperty('--avatar-top');
    } else {
      this.#documentElement.removeProperty('--header-inner-position');
      this.#documentElement.setProperty('--header-top', '0px');
      this.#documentElement.setProperty('--avatar-top', '0px');
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

    this.#documentElement.setProperty(
      '--avatar-image-transform',
      `translate3d(${x}rem, 0, 0) scale(${scale})`,
    )

    const borderScale = 1 / (toScale / scale)
    const borderX = (-toX + x) * borderScale
    const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

    this.#documentElement.setProperty('--avatar-border-transform', borderTransform)
    this.#documentElement.setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
  }
}
