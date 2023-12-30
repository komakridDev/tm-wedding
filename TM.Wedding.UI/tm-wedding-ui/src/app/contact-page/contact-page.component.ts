import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {
  rsvpForm: FormGroup;
  submitterName: FormControl;
  submitterSurname: FormControl;
  email: FormControl;
  phone: FormControl;
  comments: FormControl;
  isLoading: boolean = false;
  errorMessage: string = "";

  languageConfig: LanguageCofig;
  private languageConfigSubscription: Subscription | undefined;

  constructor(private router: Router, private spinner: NgxSpinnerService, private languageService: LanguageService) {
    this.languageConfig = languageService.defaultLanuageConfig;

    this.isLoading = false;
    this.submitterName = new FormControl('', [Validators.required]);
    this.submitterSurname = new FormControl('', [Validators.required]);
    this.email = new FormControl('');
    this.phone = new FormControl('', [Validators.required]);
    this.comments = new FormControl('');

    this.rsvpForm = new FormGroup({
      submitterName: this.submitterName,
      submitterSurname: this.submitterSurname,
      email: this.email,
      phone: this.phone,
      comments: this.comments
    });
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 2000);

    this.languageConfigSubscription = this.languageService.languageConfig$.subscribe((config) => {
      this.languageConfig = config;
    });
  }
  ngOnDestroy(): void {
    this.isLoading = false;
    if(this.languageConfigSubscription){
      this.languageConfigSubscription?.unsubscribe();
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.spinner.show();

    try{
      setTimeout(() => {
        this.sendContactResponse();
        this.rsvpForm.reset();
        this.router.navigateByUrl("/thankyou");
        this.spinner.hide();
      }, 4000);

    }
    catch(err){
      this.isLoading = false;
      this.spinner.hide();
      this.errorMessage = "There was an error during submission please try again!"
    }

  }

  private sendContactResponse(){

    console.log("sending Contact form via email");

    emailjs.init("6cKvFXLfFf7eDWXKQ");
    emailjs.send("service_vjkvo97","template_bo7u8n9",{
      rsvp_name: this.rsvpForm.controls['submitterName'].value,
      rsvp_lastname: this.rsvpForm.controls['submitterSurname'].value,
      rsvp_phone: this.rsvpForm.controls['phone'].value,
      rsvp_email: this.rsvpForm.controls['email'].value,
      rsvp_comments: this.rsvpForm.controls['comments'].value,
    });

  }
}