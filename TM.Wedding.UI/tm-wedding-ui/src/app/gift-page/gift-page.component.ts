import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gift-page',
  templateUrl: './gift-page.component.html',
  styleUrls: ['./gift-page.component.css'],
})
export class GiftPageComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = false;
  protected languageConfig: LanguageCofig;
  private languageConfigSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private languageService: LanguageService
  ) {
    this.languageConfig = languageService.defaultLanuageConfig;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 2000);

    this.languageConfigSubscription =
      this.languageService.languageConfig$.subscribe((config) => {
        this.languageConfig = config;
      });
  }
  ngOnDestroy(): void {
    this.isLoading = false;
    if (this.languageConfigSubscription) {
      this.languageConfigSubscription?.unsubscribe();
    }
  }
}
