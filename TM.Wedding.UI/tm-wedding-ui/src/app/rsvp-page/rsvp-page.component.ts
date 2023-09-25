import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.css']
})
export class RsvpPageComponent implements OnInit, OnDestroy {
  rsvpForm: FormGroup;
  attendCeremony: FormControl;
  attendParty: FormControl;
  submitterName: FormControl;
  submitterSurname: FormControl;
  submitterFullName: FormControl
  email: FormControl;
  phone: FormControl;
  peopleCount: FormControl<number | null>;
  subscribeFlag: FormControl;
  comments: FormControl;
  errorMessage: string;
  isLoading: boolean = false;
  submitterWillAttend: boolean = false;
  attendees: string[] = [];
  private _atteendees: string[] = [];

  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.errorMessage = '';
    this.isLoading = false;
    this.attendCeremony = new FormControl(false, [Validators.required]);
    this.attendParty = new FormControl(false, [Validators.required]);
    this.submitterName = new FormControl('', [Validators.required]);
    this.submitterSurname = new FormControl('', [Validators.required]);
    this.submitterFullName = new FormControl('');
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
      comments: this.comments,
      submitterFullName: this.submitterFullName
    });

    this.rsvpForm.get('submitterFullName')?.disable();
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 2000);
  }
  ngOnDestroy(): void {
    this.isLoading = false;
  }

  onSubmit() {
    this.isLoading = true;
    this.spinner.show();

    try{
      setTimeout(() => {
        this.sendRsvpResponse();
        this.rsvpForm.reset();
        this.router.navigateByUrl("/thankyou");
        this.spinner.hide();
      }, 4000);

    }
    catch(err){
      this.isLoading = false;
      this.spinner.hide();
      this.errorMessage = "There was an error during submission please try again!"
    }

  }

  onSubmitterChange(){
    this.submitterFullName.setValue(this.rsvpForm.controls['submitterName'].value + ' ' + this.rsvpForm.controls['submitterSurname'].value);
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
      var arr_names:string[] = new Array(numberOfPeople-1);
      var arr_names_temp:string[] = new Array(numberOfPeople-1); 
      for(let indx=0; indx<numberOfPeople-1; indx++){
        arr_names[indx] = "";
        this.attendees = arr_names;
        this._atteendees = arr_names_temp;
      }
    }
  }

  onAttendeeChange(rowIndex:number){
    var domElement = document.getElementById('attendRow'+rowIndex) as HTMLInputElement;
    if(domElement && rowIndex<this.attendees.length){
      this._atteendees[rowIndex] = domElement.value;
    }
  }

  private sendRsvpResponse(){

    console.log("sending RSVP form via email");

    this._atteendees = this._atteendees.filter((value) => {return value && value !== ''});
    const submitterFullName = this.rsvpForm.controls['submitterName'].value + ' ' + this.rsvpForm.controls['submitterSurname'].value; 

    emailjs.init("6cKvFXLfFf7eDWXKQ");
    emailjs.send("service_vjkvo97","template_eit5n88",{
      rsvp_name: this.rsvpForm.controls['submitterName'].value,
      rsvp_lastname: this.rsvpForm.controls['submitterSurname'].value,
      rsvp_phone: this.rsvpForm.controls['phone'].value,
      rsvp_email: this.rsvpForm.controls['email'].value,
      rsvp_ceremony: ((this.rsvpForm.controls['attendCeremony'].value)??false)? 'Yes' : 'No',
      rsvp_party: (this.rsvpForm.controls['attendParty'].value ??false) ? 'Yes' : 'No',
      rsvp_people_count: this.rsvpForm.controls['peopleCount'].value,
      rsvp_people: submitterFullName + (this._atteendees.length>0 ? ', ' : '') + this._atteendees.join(', '),
      rsvp_comments: this.rsvpForm.controls['comments'].value,
    });

  }
}