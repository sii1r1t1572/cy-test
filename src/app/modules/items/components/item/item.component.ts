import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../../../../core/interfaces/item.interface';
import { ItemsService } from '../../../../core/items/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public item$: Observable<IItem>;

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getItemById();
  }

  private getItemById(): void {
    const id = +this.route.snapshot.params.id;
    this.item$ = this.itemsService.getItemById(id);
  }

  public deleteItem(id: number): void {
    this.itemsService.deleteItem(id).pipe(
      take(1)
    ).subscribe(() => {
      this.router.navigate(['items']);
    });
  }

}
