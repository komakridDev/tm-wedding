import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  errorMessage: string;
  isLoading: boolean;

  constructor(private router: Router) {
    this.errorMessage = '';
    this.isLoading = false;
    this.password = new FormControl('', [Validators.required]);
    this.username = new FormControl('Guest', [Validators.required]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });

  }

  onSubmit() {
    this.isLoading = true;
    var psw = this.loginForm.controls['password'].value;

   if(psw === 'tm2024'){

    sessionStorage.setItem('AuthStatus', 'LoggedIn')
    sessionStorage.setItem('SessionToken', psw)

    setTimeout(() => {
      this.isLoading = false;
      this.loginForm.reset();
      this.router.navigate(['']);
    }, 2000);
   }else{
    this.isLoading = false;
    this.errorMessage = "Password is wrong please try again"
   }

  }
}
