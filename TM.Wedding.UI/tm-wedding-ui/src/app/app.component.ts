import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthGuard } from './auth.guard';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'tm-wedding-ui';

  @ViewChild('audio') audio: ElementRef | undefined;
  @ViewChild('options') text: ElementRef | undefined;
  @ViewChild('button') btn: ElementRef | undefined;

  userLoggedIn: boolean = false;
  isAudioPlaying: boolean = false;

  constructor(
    private authGuardservice: AuthGuard,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.userLoggedIn$.subscribe((flag) => {
      this.userLoggedIn = flag;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.isAudioPlaying) {
        this.startAudioInBackground();
      }
    }, 2000);
  }

  startAudioInBackground() {
    try {
      if (this.audio && this.text) {
        this.text.nativeElement.innerHTML = `autoplay: ${
          this.audio.nativeElement.autoplay ? 'on' : 'off'
        } loop: ${this.audio.nativeElement.loop} muted: ${
          this.audio.nativeElement.muted
        }`;
      }

      if (this.audio && this.btn) {
        this.btn.nativeElement.click();
        this.audio.nativeElement.play();
        this.isAudioPlaying = true;
        console.log('Start background audio music');
      }
    } catch (err) {
      this.isAudioPlaying = false;
    }
  }
}
