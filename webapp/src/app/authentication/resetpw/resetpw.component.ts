import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})

export class ResetpwComponent implements OnInit {

  credentials: any = {};

  constructor(private _authenticationService: AuthenticationService,private route: ActivatedRoute) {
    var id = this.route.snapshot.queryParams["id"];
    var token = this.route.snapshot.queryParams["t"];
    this.credentials.id = id;
    this.credentials.token = token;
  }

  resetpw() {

    this._authenticationService.resetpw(this.credentials)
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
