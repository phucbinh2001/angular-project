import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty, isNil } from 'lodash';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getItem, removeItem, setItem } from 'src/app/utils/local-storage';
import { ACCESS_TOKEN, USER_PROFILE } from 'src/app/utils/storage-keys';
import { BaseHttpService } from '../base-http.service';
import { IUserToken } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {
  public onUserLoggedIn: Subject<string> = new Subject();
  public onUserLoggedOut: Subject<void> = new Subject();
  public onApiError: Subject<string> = new Subject();

  constructor(http: HttpClient) {
    super(http);
  }

  private handleErrorResponse(res: HttpErrorResponse) {
    if (res.status >= 500) {
      this.onApiError.next('Server Error');
      return;
    }

    const error = res.error as { detail: string };

    if (isNil(error)) {
      this.onApiError.next('Unknown Error');
    } else {
      this.onApiError.next(error.detail);
    }
  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      return this.handleErrorResponse(err);
    }

    this.onApiError.next('Unknown Error');
  }

  checkUserAccess() {
    const token = getItem(ACCESS_TOKEN);

    if (isEmpty(token)) {
      return false;
    }

    return true;
  }

  async signIn(email: string, password: string, gCaptcha: string) {
    const url = `${environment.internalApiUrl}/auth/login`;

    try {
      const data = await this.post<IUserToken>(
        url,
        {
          email,
          password
        },
        {
          'g-captcha': gCaptcha
        }
      );

      setItem(ACCESS_TOKEN, data.session);
      setItem(USER_PROFILE, JSON.stringify(data.profile));
      this.onUserLoggedIn.next(data.session);

      return data.session;
    } catch (err) {
      this.handleError(err);
      return '';
    }
  }

  async signOut() {
    const context = this;

    return new Promise<void>((resolve) => {
      removeItem(ACCESS_TOKEN);
      resolve();
      context.onUserLoggedOut.next();
    });
  }
}
