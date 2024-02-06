import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  protected loginForm: FormGroup;
  protected username: FormControl;
  protected password: FormControl;
  protected errorMessage: string;
  protected isLoading: boolean;

  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.errorMessage = '';
    this.isLoading = false;
    this.password = new FormControl('', [Validators.required]);
    this.username = new FormControl('Guest', [Validators.required]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }
  ngOnInit(): void {
    this.setAnimations();
  }
  ngOnDestroy(): void {
    this.isLoading = false;
  }

  onSubmit() {
    this.isLoading = true;
    this.spinner.show();
    var psw = this.loginForm.controls['password'].value;

    if (psw === '240824') {
      sessionStorage.setItem('AuthStatus', 'LoggedIn');
      sessionStorage.setItem('SessionToken', psw);

      setTimeout(() => {
        this.loginForm.reset();
        window.location.href = '';
        this.spinner.hide();
      }, 2000);
    } else {
      this.isLoading = false;
      this.spinner.hide();
      this.errorMessage = 'Password is wrong please try again';
    }
  }

  setAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');

    const appearOptions = {
      threshold: 0,
      rootMargin: '0px 0px -250px 0px',
    };

    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove('appear');
          return;
        } else {
          entry.target.classList.add('appear');
        }
      });
    },
    appearOptions);

    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });

    sliders.forEach((slider) => {
      appearOnScroll.observe(slider);
    });
  }
}
