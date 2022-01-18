import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemComponent } from './components/item/item.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './index/index.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { MatCardModule } from '@angular/material/card';

const COMPONENTS = [
  ItemsComponent,
  AddItemComponent,
  ItemComponent,
  HeaderComponent,
  IndexComponent,
  ItemCardComponent
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule
  ]
})
export class ItemsModule {
}
