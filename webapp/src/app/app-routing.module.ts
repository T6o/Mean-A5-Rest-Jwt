import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

//import { HeroDetailComponent } from './hero-detail.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { ErrorComponent } from './error/error.component';
import { ForgotpwComponent } from './authentication/forgotpw/forgotpw.component';
import { ResetpwComponent } from './authentication/resetpw/resetpw.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuardService as AuthGuard } from './authentication/authentication-guard.service';


import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgotpw', component: ForgotpwComponent },
  { path: 'reset', component: ResetpwComponent },
  { path: 'error', children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ErrorComponent
      }]
  },
  { path: 'profile', children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProfileComponent
      }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
