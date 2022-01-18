import { Injectable } from '@angular/core';
import { DataBaseService } from '../data-base/data-base.service';
import { map } from 'rxjs/operators';
import { IDataBase } from '../interfaces/data-base.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private dataBaseService: DataBaseService) {
  }

  public getUserEmail(): Observable<string> {
    return this.dataBaseService.bd.pipe(
      map((data: IDataBase) => data.auth.email)
    );
  }
}
