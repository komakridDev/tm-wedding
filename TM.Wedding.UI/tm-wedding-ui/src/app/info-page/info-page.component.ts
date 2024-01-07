import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css'],
})
export class InfoPageComponent implements OnInit, AfterViewInit {
  protected hideInfoDetails: boolean = true;
  protected loading = true;
  protected languageConfig: LanguageCofig;
  private languageConfigSubscription: Subscription | undefined;
  
  constructor(
    private spinner: NgxSpinnerService,
    private languageService: LanguageService
  ) {
    this.languageConfig = languageService.defaultLanuageConfig;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.setAnimations();

    this.languageConfigSubscription =
      this.languageService.languageConfig$.subscribe((config) => {
        this.languageConfig = config;
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
      this.spinner.hide();
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.languageConfigSubscription) {
      this.languageConfigSubscription?.unsubscribe();
    }
  }

  onShowMoreDetails() {
    this.hideInfoDetails = !this.hideInfoDetails;
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
