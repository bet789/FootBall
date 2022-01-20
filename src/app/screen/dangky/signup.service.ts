import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Captcha } from './captcha.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  captchaUrl = "https://api.jun82.com/jun88-ecp/api/v1/captchas/random";
  registerUrl = "https://api.jun82.com/jun88-ecp/api/v1/register";
  loginUrl = "https://api.jun82.com/jun88-ecp/api/v1/login";
  constructor(private http: HttpClient) { }
  public getCaptcha() : Observable<Captcha> {
      return this.http.get<Captcha>(this.captchaUrl);
  }

  public register(user: any) : Observable<any> {
      return this.http.post(this.registerUrl, user);
  }

  public login(user : any) : Observable<any> {
      return this.http.post(this.loginUrl, user);
  }
}
