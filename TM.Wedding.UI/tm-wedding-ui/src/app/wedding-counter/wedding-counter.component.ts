import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wedding-counter',
  templateUrl: './wedding-counter.component.html',
  styleUrls: ['./wedding-counter.component.css'],
})
export class WeddingCounterComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  percentage: number = 0;
  date: any;
  now: any;
  targetDate: Date = new Date(2024, 7, 25, 19, 30, 0);
  targetTime: any = this.targetDate.getTime();
  difference: number | undefined;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;

  @ViewChild('days', { static: true }) days: ElementRef | undefined;
  @ViewChild('hours', { static: true }) hours: ElementRef | undefined;
  @ViewChild('minutes', { static: true }) minutes: ElementRef | undefined;
  @ViewChild('seconds', { static: true }) seconds: ElementRef | undefined;

  languageConfig: LanguageCofig;
  private languageConfigSubscription: Subscription | undefined;

  constructor(private languageService: LanguageService) {
    this.languageConfig = languageService.defaultLanuageConfig;
  }

  ngOnInit(): void {
    this.languageConfigSubscription =
      this.languageService.languageConfig$.subscribe((config) => {
        this.languageConfig = config;
      });
  }

  ngOnDestroy(): void {
    if (this.languageConfigSubscription) {
      this.languageConfigSubscription?.unsubscribe();
    }
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      console.log(this.targetTime);
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);
    }, 1000);
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    if (
      this.days &&
      this.hours &&
      this.minutes &&
      this.seconds &&
      this.difference
    ) {
      if (19 - this.date.getHours() < 0) {
        this.days.nativeElement.innerText = Math.floor(this.difference) - 1;
        this.hours.nativeElement.innerText = 24 + (19 - this.date.getHours());
      } else {
        this.days.nativeElement.innerText = Math.floor(this.difference);
        this.hours.nativeElement.innerText = 19 - this.date.getHours();
      }

      this.minutes.nativeElement.innerText = 60 - this.date.getMinutes();
      this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();

      this.setProgressBar(
        Math.floor(this.difference),
        23 - this.date.getHours(),
        60 - this.date.getMinutes()
      );
    }
  }

  setProgressBar(
    daysRemaining: number,
    hoursRemaining: number,
    minutesRemaining: number
  ) {
    if (this.difference) {
      const totalTime = 525600;
      const timeLeft =
        daysRemaining * 60 * 24 + hoursRemaining * 60 + minutesRemaining;

      if (timeLeft > 0) {
        this.percentage = Math.round(
          ((totalTime - timeLeft) / totalTime) * 100
        );
      }
    }
  }
}
