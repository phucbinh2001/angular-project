import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public isLoggingIn: boolean = false;
  public hasError: boolean = false;
  public errorMessage: string = 'Test Error Message';

  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.userService.onApiError.subscribe(this.handleApiError.bind(this));
  }

  private handleApiError(message: string) {
    this.isLoggingIn = false;
    this.hasError = true;
    this.errorMessage = message;
  }

  async onSubmit() {
    this.isLoggingIn = true;
    const context = this;

    this.recaptchaV3Service.execute('login').subscribe(
      (token) => context.onCaptchaVerified(token),
      (err) => context.onCaptchaError(err)
    );
  }

  async onCaptchaVerified(token: string) {
    const accessToken = await this.userService.signIn(
      this.loginForm.value.email,
      this.loginForm.value.password,
      token
    );

    if (isEmpty(accessToken)) {
      return;
    }

    this.router.navigateByUrl('/home');
  }

  async onCaptchaError(err: any) {
    console.log(err);
  }
}
