import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  effect, ElementRef, HostListener,
  inject,
  Renderer2,
  signal,
  untracked, viewChild
} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {filter, map} from "rxjs";
import {NgOptimizedImage} from "@angular/common";
import {Avatar} from "./avatar/avatar";
import {Body} from "../../services/body";

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

@Component({
  selector: 'app-header',
  imports: [Avatar],
  templateUrl: './header.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly #router = inject(Router);
  readonly #body = inject(Body);
  // readonly #renderer = inject(Renderer2);
  readonly #document = inject(DOCUMENT);
  readonly #isInitial = signal(true);
  readonly isHomePage = toSignal(this.#router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.#router.url === '/')), { initialValue: false });
  readonly headerRef = viewChild.required<ElementRef<HTMLDivElement>>('header');
  readonly avatarRef = viewChild<ElementRef<HTMLDivElement>>('avatar');

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
      this.#body.setProperty('--header-position', 'sticky');
    }

    this.#body.setProperty('--content-offset', `${downDelay}px`);

    if (this.#isInitial() || scrollY < downDelay) {
      this.#body.setProperty('--header-height', `${downDelay + height}px`);
      this.#body.setProperty('--header-mb', `${-downDelay}px`);
    } else if (top + height < -upDelay) {
      const offset = Math.max(height, scrollY - upDelay);
      this.#body.setProperty('--header-height', `${offset}px`);
      this.#body.setProperty('--header-mb', `${height - offset}px`);
    } else if (top === 0) {
      this.#body.setProperty('--header-height', `${scrollY + height}px`);
      this.#body.setProperty('--header-mb', `${-scrollY}px`);
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      this.#body.setProperty('--header-inner-position', 'fixed');
      this.#body.removeProperty('--header-top');
      this.#body.removeProperty('--avatar-top');
    } else {
      this.#body.removeProperty('--header-inner-position');
      this.#body.setProperty('--header-top', '0px');
      this.#body.setProperty('--avatar-top', '0px');
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

    this.#body.setProperty(
      '--avatar-image-transform',
      `translate3d(${x}rem, 0, 0) scale(${scale})`,
    )

    const borderScale = 1 / (toScale / scale)
    const borderX = (-toX + x) * borderScale
    const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

    this.#body.setProperty('--avatar-border-transform', borderTransform)
    this.#body.setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
  }
}
