import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../../core/helpers/forms.helper';
import { SignInService } from '../../../../core/auth/sign-in.service';
import { MainComponent } from '../../../../core/models/main-component.class';
import { takeUntil } from 'rxjs/operators';
import { EAuth } from '../../../../core/enums/login.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends MainComponent implements OnInit {
  public readonly EAuth = EAuth;
  public singInForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public error: EAuth;

  constructor(private signInService: SignInService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeOnFormChanges();
  }

  public signIn(): void {
    if (this.singInForm.invalid) {
      return;
    }
    const user = {
      email: this.singInForm.get('email').value,
      password: this.singInForm.get('password').value
    };
    this.signInService.signIn(user).pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((responce: EAuth) => {
      switch (responce) {
        case EAuth.PASSWORD:
        case EAuth.UNREGISTERED:
          this.error = responce;
          break;
        case EAuth.SUCCESS:
          this.router.navigate(['/items']);
          break;
      }
    });
  }

  private initForm(): void {
    this.singInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  private subscribeOnFormChanges(): void {
    this.singInForm.valueChanges.pipe(
      takeUntil(this.unsubscriber)
    ).subscribe(() => {
      this.error = null;
    });
  }

}
