import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../environments/environment'
import { Home } from './home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: any;
  constructor(private _authenticationService: AuthenticationService, private route: ActivatedRoute) {
    this.user = _authenticationService.user;
    var id = this.route.snapshot.queryParams["id"];
    var token = this.route.snapshot.queryParams["t"];
    if (id != null || token != null) {
      _authenticationService.verify(id, token).subscribe(data => {
        let success = data['success'];

        if (success) {
          window.location.href = environment.myurl;
        }
        else
          window.location.href = environment.error+"?t="+token;
          
      });
    }
  }
  ngOnInit() {
  }
}
