import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  hideInfoDetails: boolean = true;

  onShowMoreDetails(){
    this.hideInfoDetails = !this.hideInfoDetails;
  }
}
