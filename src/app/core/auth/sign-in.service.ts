import { Injectable } from '@angular/core';
import { DataBaseService } from '../data-base/data-base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDataBase } from '../interfaces/data-base.interface';
import { IUser } from '../interfaces/user.interface';
import { EAuth } from '../enums/login.enum';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private dataBaseService: DataBaseService) {
  }

  public signIn(user: IUser): Observable<EAuth> {
    return this.dataBaseService.bd.pipe(
      map((data: IDataBase) => {
        const userInDB = data?.users?.find((u: IUser) => user.email === u.email);
        const responce = userInDB ? atob(userInDB.password) === user.password ? EAuth.SUCCESS : EAuth.PASSWORD : EAuth.UNREGISTERED;
        if (responce === EAuth.SUCCESS) {
          this.dataBaseService.updateBD('auth', {email: user.email});
        }
        return responce;
      })
    );
  }

  public logout(): Observable<boolean> {
    return this.dataBaseService.bd.pipe(
      map(() => {
        this.dataBaseService.updateBD('auth', {email: null});
        return true;
      })
    );
  }

}
