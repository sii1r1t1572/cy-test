import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/user/user.service';
import { ItemsService } from '../../../../core/items/items.service';
import { IItem } from '../../../../core/interfaces/item.interface';
import { BehaviorSubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MainComponent } from '../../../../core/models/main-component.class';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent extends MainComponent implements OnInit {
  public items$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);

  constructor(private userService: UserService,
              private itemsService: ItemsService) {
    super();
  }

  ngOnInit(): void {
    this.getItemsList();
  }

  public deleteItem(id: number): void {
    this.itemsService.deleteItem(id).pipe(
      take(1)
    ).subscribe((items: IItem[]) => this.items$.next(items));
  }

  private getItemsList(): void {
    this.itemsService.getAllItemsByUser().pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((items: IItem[]) => this.items$.next(items));
  }

}
