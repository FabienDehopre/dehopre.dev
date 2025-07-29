import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Menu} from "../../../services/menu";
import {ContainerOuter} from "../../container/container-outer";
import {ContainerInner} from "../../container/container-inner";

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ContainerOuter, ContainerInner],
  templateUrl: './footer.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
  readonly year = new Date().getFullYear();
}
