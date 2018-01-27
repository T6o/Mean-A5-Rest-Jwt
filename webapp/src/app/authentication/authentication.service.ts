import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { environment } from "../../environments/environment"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
  user: boolean;

  private _signinURL = environment.apiserver + "signin";
  private _signupURL = environment.apiserver + "signup";
  private _verify = environment.apiserver + "verify";
  private _forgotpw = environment.apiserver + "forgotpw";
  private _resetpw = environment.apiserver + "resetpw";
  private _google = environment.apiserver + "oauth/google";
  private _socialToken = environment.apiserver + "socialToken";
  private _socialTokenF = environment.apiserver + "socialTokenFacebook";


  private token = "";

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('currentUser');
  }

  public getSocialToken(): string {
    return localStorage.getItem('socialLogin');
  }

  public removeSocialToken() {
    localStorage.removeItem('socialLogin');
  }

  public getAuthenticatedUser(): string {
    return localStorage.getItem('email');
  }

  public isAuthenticated(): boolean {
    let l = tokenNotExpired("currentUser");
    return tokenNotExpired("currentUser");
  }

  google(): Observable<any>{
    return this.http.get(this._google).map(
      data =>{
        return data;
      }
    );
  }

  signin(credentials: any) {
    let body = JSON.stringify(credentials);
    return this.http.post(this._signinURL, body, { observe: 'response' })
      .map(data => {
        var token = data["body"]["token"];
        let success = data["body"]["success"];
        if (success) {
          if (token) {
            this.token = token;
            localStorage.setItem('currentUser', JSON.stringify({ token: token }));
            localStorage.setItem("email", credentials.email);
          }
          return data;
        } else {
          return data;
        }
      });
  }

  forgotpw(credentials: any) {
    let body = JSON.stringify(credentials);
    return this.http.post(this._forgotpw, body, { observe: 'response' })
      .map(data => {
        return data;
      });
  }

  resetpw(credentials: any) {
    let body = JSON.stringify(credentials);
    return this.http.post(this._resetpw, body, { observe: 'response' })
      .map(data => {
        return data;
      });
  }

  signup(user: any): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this._signupURL, body).map(
      data => {
        var token = data["token"];
        var success = data["success"];
        var message = data["message"];
        if (success) {
          return data;
        } else {
          return data;
        }
      }
    )
  }

  socialLogin(idToken: string, provider: string, email: string): Observable<any> {

    interface social {idToken: string;}
    var token: social = {idToken: idToken};

    localStorage.setItem("socialLogin", idToken);

    return this.http.get(this._socialToken).map(
      data => {
        var token = data["token"];
        let success = data["success"];
        if (success) {
          if (token) {
            this.token = token;
            localStorage.setItem('currentUser', JSON.stringify({ token: token }));
            localStorage.setItem("email", email);
          }
          return data;
        } else {
          return data;
        }
      }
    )
  }

  socialLoginFacebook(idToken: string, provider: string, email: string): Observable<any> {

    interface social {idToken: string;}
    var token: social = {idToken: idToken};

    localStorage.setItem("socialLogin", idToken);

    return this.http.get(this._socialTokenF).map(
      data => {
        var token = data["token"];
        let success = data["success"];
        if (success) {
          if (token) {
            this.token = token;
            localStorage.setItem('currentUser', JSON.stringify({ token: token }));
            localStorage.setItem("email", email);
          }
          return data;
        } else {
          return data;
        }
      }
    )
  }

  verify(id,token){
    interface Verify {id: string; token: string;}
    var obj: Verify ={id: id, token: token};

    let body = JSON.stringify(obj);

    return this.http.post(this._verify, body).map(
      data => {
        var token = data["token"];
        var success = data["success"];
        var email = data["email"];
        if(success){
          window.location.href = environment.myurl;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          localStorage.setItem("email", email);
          return data;
        }else{
          return data;
        }
      }
    )
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem("email");
  }

}
