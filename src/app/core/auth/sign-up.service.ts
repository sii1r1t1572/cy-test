import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataBaseService } from '../data-base/data-base.service';
import { IUser } from '../interfaces/user.interface';
import { delay, switchMap } from 'rxjs/operators';
import { IDataBase } from '../interfaces/data-base.interface';
import { EAuth } from '../enums/login.enum';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private dataBaseService: DataBaseService) {
  }

  public signUp(user: IUser): Observable<EAuth> {
    return this.dataBaseService.bd.pipe(
      switchMap((data: IDataBase) => {
        const userInDB = data?.users?.find((u: IUser) => user.email === u.email);
        const responce = !userInDB ? EAuth.SUCCESS : EAuth.EMAIL;
        if (responce === EAuth.SUCCESS) {
          this.dataBaseService.updateBD('users', [...(data.users ? data.users : []), {...user, password: btoa(user.password)}]);
          this.dataBaseService.updateBD('auth', {email: user.email});
        }
        return of(responce);
      }),
      delay(100)
    );
  }

}
