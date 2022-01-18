import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../../../core/interfaces/item.interface';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item: IItem;
  @Input() isOverview: boolean;
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
}
