import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const COMPONENTS = [
  PageNotFoundComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule {
}
