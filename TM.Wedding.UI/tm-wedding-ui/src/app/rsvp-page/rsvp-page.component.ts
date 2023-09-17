import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.css']
})
export class RsvpPageComponent {
  rsvpForm: FormGroup;
  attendCeremony: FormControl;
  attendParty: FormControl;
  submitterName: FormControl;
  submitterSurname: FormControl;
  email: FormControl;
  phone: FormControl;
  peopleCount: FormControl<number | null>;
  subscribeFlag: FormControl;
  comments: FormControl;
  errorMessage: string;
  isLoading: boolean = false;
  submitterWillAttend: boolean = false;
  attendees: string[] = [];

  constructor(private router: Router) {
    this.errorMessage = '';
    this.isLoading = false;
    this.attendCeremony = new FormControl(false, [Validators.required]);
    this.attendParty = new FormControl(false, [Validators.required]);
    this.submitterName = new FormControl('', [Validators.required]);
    this.submitterSurname = new FormControl('', [Validators.required]);
    this.email = new FormControl('');
    this.phone = new FormControl('', [Validators.required]);
    this.peopleCount = new FormControl(1, [Validators.required]);
    this.subscribeFlag = new FormControl(false);
    this.comments = new FormControl('');

    this.rsvpForm = new FormGroup({
      attendCeremony: this.attendCeremony,
      attendParty: this.attendParty,
      submitterName: this.submitterName,
      submitterSurname: this.submitterSurname,
      email: this.email,
      phone: this.phone,
      peopleCount: this.peopleCount,
      subscribeFlag: this.subscribeFlag,
      comments: this.comments
    });
  }

  onSubmit() {
    this.isLoading = true;
    
    console.log(this.attendees);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

  }

  onCheckboxChange(){
    var willAttendChurch = this.rsvpForm.controls['attendCeremony'].value;
    var willAttendParty = this.rsvpForm.controls['attendParty'].value;

    this.submitterWillAttend =  willAttendChurch || willAttendParty;
  }

  onPeopleCountChange(){
    var numberOfPeople = this.rsvpForm.controls['peopleCount'].value as number;
    this.attendees = []
    if(numberOfPeople-1>0){
      var arr_names:string[] = new Array(numberOfPeople-1) 
      for(let indx=0; indx<numberOfPeople-1; indx++){
        arr_names[indx] = "";
        this.attendees = arr_names;
      }
    }
  }
}