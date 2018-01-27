import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { environment } from '../../../environments/environment';
import { Validators } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';


@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent {
  errorMessage: string;
  user: any = {};

  constructor(private _authenticationService: AuthenticationService,private _router: Router,public socialAuthService: AuthService) { }

  signup() {

    let email = this.user.email;
    let r = Validators.email;

    this._authenticationService.signup(this.user)
      .subscribe(data => {
        let success = data["success"];
        let message = data["message"];
        if (success) {
          this.errorMessage = '';
          window.location.href = environment.myurl + "signin";
        }
        else
          this.errorMessage = message;
      },
      error => this.errorMessage = error);
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

        var idToken = userData["idToken"];
        var provider = userData["provider"];
        var mail = userData["email"];

        this._authenticationService.socialLogin(idToken,provider,mail)
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

}
