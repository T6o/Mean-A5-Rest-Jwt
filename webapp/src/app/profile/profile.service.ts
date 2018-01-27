import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable()
export class ProfileService {

  private _profileURL = environment.apiserver + "profile";
  private _updateP = environment.apiserver + "update";

  constructor(private http: HttpClient) {
    this.getProfile(localStorage.getItem("email"));
  }

  getProfile(email: any) {
    interface Verify { email: string; }
    var obj: Verify = { email: email };

    return this.http.post(this._profileURL, obj)
      .map(data => {
        return data;
      });
  }

  updateProfile(user: any) {
    let body = JSON.stringify(user);
    return this.http.post(this._updateP, body)
      .map(data => {
        return data;
      });
  }

}
