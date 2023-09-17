import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  private authStatusKey = "LoggedIn";
  private sessionTokenKey = "tm2024"

  constructor() {
  }

  getObservableToken(): Observable<boolean> {
    if (sessionStorage.getItem("AuthStatus") !== undefined && sessionStorage.getItem("SessionToken") !== null) {
        if(sessionStorage.getItem("AuthStatus") === this.authStatusKey && sessionStorage.getItem("SessionToken") === this.sessionTokenKey){
            return of(true);
        }else{
            return of(false);
        }
    }
    else {
      return of(false);
    }
  }
}