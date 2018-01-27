import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

  title = 'app';
  user : boolean;
  email : any;
  isCollapsed = true;

  constructor (private _authenticationService: AuthenticationService, private _router: Router) {
    this.email = _authenticationService.getAuthenticatedUser();
		this.user = _authenticationService.isAuthenticated();

	}

  logout() {
    this._authenticationService.logout();
    window.location.href = environment.myurl;
  }

}
