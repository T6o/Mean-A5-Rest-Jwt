import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from "../../environments/environment"

@Injectable()
export class AuthenticationGuardService {

  constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate(){
      if (!this.auth.isAuthenticated()) {
        window.location.href = environment.myurl;
      }else{
        return true;
      }
    }

}
