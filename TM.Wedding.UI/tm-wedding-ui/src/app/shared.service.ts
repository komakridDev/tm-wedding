import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);

  userLoggedIn$ = this.userLoggedInSubject.asObservable();

  setLoggenInFlag(newValue: boolean) {
    this.userLoggedInSubject.next(newValue);
  }
}
