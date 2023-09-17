import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'tm-wedding-ui';

  @ViewChild('audio') audio: ElementRef | undefined;
  @ViewChild('options') text: ElementRef | undefined;
  @ViewChild('button') btn: ElementRef | undefined;

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
