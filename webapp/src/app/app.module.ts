import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular5-social-login";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpModule } from '@angular/http';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
import { JwtInterceptor } from './authentication/jwt.interceptor';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ErrorComponent } from './error/error.component';
import { ForgotpwComponent } from './authentication/forgotpw/forgotpw.component';
import { ResetpwComponent } from './authentication/resetpw/resetpw.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuardService } from './authentication/authentication-guard.service';
import { ProfileService } from './profile/profile.service';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';
import { BrowserXhr } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("")
      },
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    ErrorComponent,
    ForgotpwComponent,
    ResetpwComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    NgbModule.forRoot(),
    MyDatePickerModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthenticationService,
    AuthenticationGuardService,
    ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {provide: BrowserXhr, useClass:CustExtBrowserXhr},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
