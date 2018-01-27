import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { environment } from '../../../environments/environment';
import { Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.css'],
})

export class SigninComponent {

  errorMessage: string;
  credentials: any = {};
  private loggedIn: boolean;

  constructor(private _authenticationService: AuthenticationService, public _router: Router,
    public socialAuthService: AuthService) { }

  ngOnInit() {
    /*  this.socialAuthService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });*/
  }

  signin() {
    let email = this.credentials.email;
    let r = Validators.email;

    this._authenticationService.signin(this.credentials)
      .subscribe(data => {
        let success = data["body"]["success"];
        let message = data["body"]["message"];
        if (success) {
          this.errorMessage = '';
          window.location.href = environment.myurl;
        }
        else
          this.errorMessage = message;
      });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        var idToken = "";


        if (socialPlatform == "facebook") {
          var idToken = userData["token"];
        } else if (socialPlatform == "google") {
          var idToken = userData["idToken"];
        }

        var provider = userData["provider"];
        var mail = userData["email"];

        this._authenticationService.socialLogin(idToken, provider, mail)
          .subscribe(data => {
            let success = data["success"];
            let message = data["token"];
            if (success) {
              this.errorMessage = '';
              window.location.href = environment.myurl;
            }
            else
              this.errorMessage = message;
          });
      }
    );
  }

  public socialSignInFacebook(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          var idToken = "";

          if (socialPlatform == "facebook") {
            var idToken = userData["token"];

            var provider = userData["provider"];
            var mail = userData["email"];

            this._authenticationService.socialLoginFacebook(idToken, provider, mail)
              .subscribe(data => {
                let success = data["success"];
                let message = data["token"];
                if (success) {
                  this.errorMessage = "La tua mail facebook non e' verificata verificala oppure utilizza un' altro metodo";
                  window.location.href = environment.myurl;
                }
                else
                  this.errorMessage = message;
              });
          }
        });
    }
  }
}
