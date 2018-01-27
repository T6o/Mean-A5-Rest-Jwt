import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { environment } from "../../environments/environment";
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  // public model: any = { date: { year: 2018, month: 10, day: 9 } };

  private token = "";
  name: string;
  errorMessage: string;
  gender: string;
  phone: string;
  email: string;
  language: string;
  overview: string;
  user: any = {};

  english: boolean;
  french: boolean;
  german: boolean;
  italian: boolean;
  spanish: boolean;
  selDate: any;

  constructor(private pservice: ProfileService) {
    this.getProfile();
  }

  getProfile() {
    this.pservice.getProfile(localStorage.getItem("email"))
      .subscribe(data => {

        let success = data["success"];
        var i = data["user"];
        this.user = data["user"];
        var b = data["user"]["birthDay"];
        let d = new Date(b);

        this.selDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };

        this.user.english = JSON.parse(data["user"]["english"]);
        this.user.french = JSON.parse(data["user"]["french"]);
        this.user.german = JSON.parse(data["user"]["german"]);
        this.user.italian = JSON.parse(data["user"]["italian"]);
        this.user.spanish = JSON.parse(data["user"]["spanish"]);
        this.user.traveler = JSON.parse(data["user"]["traveler"]);
        this.user.expert = JSON.parse(data["user"]["expert"]);

      });
  }

  updateProfile() {
    this.pservice.updateProfile(this.user).subscribe(data => {
      let success = data["success"];
    });

  }

  getselectedOptions(options) {
    return options
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  ngOnInit() {

  }

}
