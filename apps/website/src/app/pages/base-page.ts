import type { MetaInfo } from '../types/meta-info';

import { computed, Directive, input } from '@angular/core';

@Directive({})
export abstract class BasePage {
  readonly meta = input.required<MetaInfo>();
  readonly title = computed(() => this.meta().title);
  readonly description = computed(() => this.meta().description);
}
