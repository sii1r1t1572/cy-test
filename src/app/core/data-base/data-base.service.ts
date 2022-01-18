import { Injectable } from '@angular/core';
import { IDataBase } from '../interfaces/data-base.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private DB: BehaviorSubject<IDataBase> = new BehaviorSubject<IDataBase>({});
  private localStorageKey = 'SM-DB';

  public get bd(): BehaviorSubject<IDataBase> {
    return this.DB;
  }

  public init(): void {
    const data = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!data) {
      localStorage.setItem(this.localStorageKey, '{}');
    }
    this.DB.next(JSON.parse(localStorage.getItem(this.localStorageKey)) || {});
  }

  public updateBD(key: string, value: any): any {
    const db = JSON.parse(localStorage.getItem(this.localStorageKey));
    db[key] = value;
    localStorage.setItem(this.localStorageKey, JSON.stringify(db));
    setTimeout(() => this.DB.next(db), 100);
  }
}
