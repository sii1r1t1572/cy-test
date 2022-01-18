import { Injectable } from '@angular/core';
import { DataBaseService } from '../data-base/data-base.service';
import { IItem } from '../interfaces/item.interface';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IDataBase } from '../interfaces/data-base.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  constructor(private dataBaseService: DataBaseService,
              private userService: UserService) {
  }

  public getAllItemsByUser(): Observable<IItem[]> {
    return this.userService.getUserEmail().pipe(
      switchMap((email: string) => this.dataBaseService.bd.pipe(
        take(1),
        map((data: IDataBase) => {
          return data.items[email] || [];
        })
      ))
    );
  }

  public getItemById(id: number): Observable<IItem> {
    return this.userService.getUserEmail().pipe(
      switchMap((email: string) => this.dataBaseService.bd.pipe(
        take(1),
        map((data: IDataBase) => {
          return data.items[email].find((item: IItem) => item.id === id) || null;
        })
      ))
    );
  }

  public saveNewItem(item: IItem): Observable<boolean> {
    return this.userService.getUserEmail().pipe(
      switchMap((email: string) => this.dataBaseService.bd.pipe(
        take(1),
        map((data: IDataBase) => {
          const list: any[] = data.items || {};
          if (list[email]) {
            list[email].push(item);
          } else {
            list[email] = [item];
          }
          this.dataBaseService.updateBD('items', list);
          return true;
        })
      ))
    );
  }

  public updateItem(item: IItem): Observable<boolean> {
    return this.userService.getUserEmail().pipe(
      switchMap((email: string) => this.dataBaseService.bd.pipe(
        take(1),
        map((data: IDataBase) => {
          const list: any[] = data.items || {};
          if (list[email]) {
            list[email] = list[email].map((i: IItem) => item.id === i.id ? item : i);
          }
          this.dataBaseService.updateBD('items', list);
          return true;
        })
      ))
    );
  }

  public deleteItem(id: number): Observable<IItem[]> {
    return this.userService.getUserEmail().pipe(
      switchMap((email: string) => this.dataBaseService.bd.pipe(
        take(1),
        map((data: IDataBase) => {
          const list: any[] = data.items || {};
          list[email] = list[email].filter((item: IItem) => item.id !== id);
          this.dataBaseService.updateBD('items', list);
          return list[email];
        })
      ))
    );
  }

}
