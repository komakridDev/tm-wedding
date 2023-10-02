import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  languageSelectedCode: string = "en";
  languageConfig: LanguageCofig;

  private languageSubscription: Subscription | undefined;
  private languageConfigSubscription: Subscription | undefined;
  
  constructor(private languageService : LanguageService, private spinner: NgxSpinnerService){
    this.languageConfig = languageService.defaultLanuageConfig;
  }

  ngOnInit(): void {
    this.languageSubscription = this.languageService.languageCode$.subscribe((code) => {
      this.languageSelectedCode = code;
    });

    this.languageConfigSubscription = this.languageService.languageConfig$.subscribe((config) => {
      this.languageConfig = config;
    });
  }

  ngOnDestroy(): void {
    if(this.languageSubscription){
      this.languageSubscription.unsubscribe();
      this.languageConfigSubscription?.unsubscribe();
    }
  }

  changeLanguage(languageCode: string){
    if(languageCode==='en' || languageCode==='el'){
      this.spinner.show();
      this.languageService.setLanguageCode(languageCode);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
  }

}
