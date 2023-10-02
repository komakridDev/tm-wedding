import { Component, OnInit } from '@angular/core';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css']
})
export class HomeDetailsComponent implements OnInit {

  languageConfig: LanguageCofig;
  private languageConfigSubscription: Subscription | undefined;
  
  constructor(private languageService : LanguageService){
    this.languageConfig = languageService.defaultLanuageConfig;
  }

  ngOnInit(): void {
    this.setAnimations();
    
    this.languageConfigSubscription = this.languageService.languageConfig$.subscribe((config) => {
      this.languageConfig = config;
    });
  }

  ngOnDestroy(): void {
    if(this.languageConfigSubscription){
      this.languageConfigSubscription?.unsubscribe();
    }
  }

  setAnimations(){
    const faders = document.querySelectorAll(".fade-in");
    const sliders = document.querySelectorAll(".slide-in");

    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -250px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove("appear");
          return;
        } else {
          entry.target.classList.add("appear");
        }
      });
    },
      appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
      appearOnScroll.observe(slider);
    });

  }
}
