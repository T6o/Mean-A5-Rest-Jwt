import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent implements OnInit {

  credentials: any = {};
  constructor(private _authenticationService: AuthenticationService) { }

  forgotpw() {
    this._authenticationService.forgotpw(this.credentials)
      .subscribe(data => {
        let success = data["body"]["success"];
        if (success) {
          window.location.href = environment.myurl;
        }
      })
  }

  ngOnInit() {
  }

}
