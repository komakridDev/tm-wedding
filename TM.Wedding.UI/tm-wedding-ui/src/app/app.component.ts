import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthguardService } from './authguard.service';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,  OnInit{
  title = 'tm-wedding-ui';

  @ViewChild('audio') audio: ElementRef | undefined;
  @ViewChild('options') text: ElementRef | undefined;
  @ViewChild('button') btn: ElementRef | undefined;

  userLoggedIn: Observable<boolean | Observable<boolean>> = of(true);

  constructor(private authGuardservice: AuthGuard){}

  ngOnInit(): void {

    this.authGuardservice.isLoggedIn$.subscribe((data) => {
      this.userLoggedIn = of(data);
    });
  }

  ngAfterViewInit(): void {

    if (this.audio && this.text) {
      this.audio.nativeElement.play();
      this.text.nativeElement.innerHTML = `autoplay: ${this.audio.nativeElement.autoplay ? 'on' : 'off'
        } loop: ${this.audio.nativeElement.loop} muted: ${this.audio.nativeElement.muted
        }`;
    }

    if (this.audio && this.btn) {
      this.btn.nativeElement.click();
      this.audio.nativeElement.play();
    }
  }
}
