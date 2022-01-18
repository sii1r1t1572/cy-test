import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../../../../core/auth/sign-up.service';
import { checkPasswords, MyErrorStateMatcher, PasswordStateMatcher } from '../../../../core/helpers/forms.helper';
import { Router } from '@angular/router';
import { EAuth } from '../../../../core/enums/login.enum';
import { MainComponent } from '../../../../core/models/main-component.class';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends MainComponent implements OnInit {
  public readonly EAuth = EAuth;
  public singUpForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public matcherPassword = new PasswordStateMatcher();
  public error: EAuth;

  constructor(private signUpService: SignUpService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public signUp(): void {
    if (this.singUpForm.invalid) {
      return;
    }
    const user = {
      email: this.singUpForm.get('email').value,
      password: this.singUpForm.get('password').value
    };
    this.signUpService.signUp(user).pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((responce: EAuth) => {
      this.error = responce;
      if (responce === EAuth.SUCCESS) {
        this.router.navigate(['/items']);
      }
    });
  }

  private initForm(): void {
    this.singUpForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: checkPasswords });
  }

}
