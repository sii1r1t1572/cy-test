import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './components/no-data/no-data.component';

const COMPONENTS = [
  NoDataComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class SharedModule {
}
