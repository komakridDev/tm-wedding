import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageCofig, LanguageService } from '../language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  protected languageConfig: LanguageCofig;
  private languageConfigSubscription: Subscription | undefined;

  constructor(private languageService: LanguageService){
    this.languageConfig = languageService.defaultLanuageConfig;
  }

  ngOnInit(): void {
    this.languageConfigSubscription =
      this.languageService.languageConfig$.subscribe((config) => {
        this.languageConfig = config;
      });

      const homeHeader = document.getElementById("homeHeader");
      if(homeHeader){
        homeHeader.style.display = "none";
      }
      window.scrollTo(0, 0);
    }
  ngOnDestroy(): void {
    if (this.languageConfigSubscription) {
      this.languageConfigSubscription?.unsubscribe();
    }
  }

}
