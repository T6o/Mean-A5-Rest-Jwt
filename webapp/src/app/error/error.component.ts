import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    var token = this.route.snapshot.queryParams["t"];
    if (token == null) {
      window.location.href = environment.myurl;
    }
  }

  ngOnInit() {
  }

}
