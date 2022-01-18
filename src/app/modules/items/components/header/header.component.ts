import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from '../../../../core/auth/sign-in.service';
import { UserService } from '../../../../core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { MainComponent } from '../../../../core/models/main-component.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends MainComponent implements OnInit {

  public userEmail$: Observable<string>;

  constructor(private userService: UserService,
              private signInService: SignInService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  public logout(): void {
    this.signInService.logout().pipe(
      takeUntil(this.unsubscriber)
    ).subscribe(() => {
      this.router.navigate(['sign-in']);
    });
  }

  private getUserData(): void {
    this.userEmail$ = this.userService.getUserEmail();
  }

}
