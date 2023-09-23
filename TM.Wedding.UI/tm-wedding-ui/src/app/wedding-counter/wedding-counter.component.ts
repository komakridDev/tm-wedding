import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wedding-counter',
  templateUrl: './wedding-counter.component.html',
  styleUrls: ['./wedding-counter.component.css']
})
export class WeddingCounterComponent implements AfterViewInit {
  percentage: number = 0;
  date: any;
  now: any;
  targetDate: any = new Date(2024, 7, 24, 19, 30, 0);
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

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      if(this.days){
        !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
      }
    }, 1000);
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    if(this.days && this.hours && this.minutes && this.seconds && this.difference){
      this.days.nativeElement.innerText = Math.floor(this.difference);
      this.hours.nativeElement.innerText = 23 - this.date.getHours();
      this.minutes.nativeElement.innerText = 60 - this.date.getMinutes();
      this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();
    
      this.setProgressBar(this.date);
    }
  }

  setProgressBar(days:Date){
    
    if(this.difference){
      const daysLeft =  Math.floor(this.difference);
      const hoursLeft = this.date.getHours();
      
      if(daysLeft>0){
        this.percentage = Math.round(((365-daysLeft)/365)*100);
      }
    }
  }
}
