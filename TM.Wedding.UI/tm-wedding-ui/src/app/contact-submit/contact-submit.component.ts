import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageCofig, LanguageService } from '../language.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-submit',
  templateUrl: './contact-submit.component.html',
  styleUrls: ['./contact-submit.component.css']
})
export class ContactSubmitComponent {
  protected languageConfig: LanguageCofig;

  private languageConfigSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private languageService: LanguageService
  ) {
    this.languageConfig = languageService.defaultLanuageConfig;
  }

  ngOnInit(): void {

    this.languageConfigSubscription =
      this.languageService.languageConfig$.subscribe((config) => {
        this.languageConfig = config;
      });
  }
}
