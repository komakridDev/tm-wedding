import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageCofig, LanguageService } from '../language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp-page',
  templateUrl: './rsvp-page.component.html',
  styleUrls: ['./rsvp-page.component.css'],
})
export class RsvpPageComponent implements OnInit, OnDestroy {
  protected rsvpForm: FormGroup;
  protected attendCeremony: FormControl;
  protected attendParty: FormControl;
  protected submitterName: FormControl;
  protected submitterSurname: FormControl;
  protected submitterFullName: FormControl;
  protected email: FormControl;
  protected phone: FormControl;
  protected peopleCount: FormControl<number | null>;
  protected subscribeFlag: FormControl;
  protected comments: FormControl;
  protected generalAttend: FormControl;
  protected errorMessage: string;
  protected isLoading: boolean = false;
  protected submitterWillAttend: boolean = false;
  protected attendees: string[] = [];
  protected generalAttendanceFlag: string | undefined;
  protected noAttendance: boolean = true;
  protected noAnswer: boolean = true;
  protected languageConfig: LanguageCofig;

  private _atteendees: string[] = [];
  private languageConfigSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private languageService: LanguageService
  ) {
    this.languageConfig = languageService.defaultLanuageConfig;

    this.errorMessage = '';
    this.isLoading = false;
    this.attendCeremony = new FormControl(false, [Validators.required]);
    this.attendParty = new FormControl(false, [Validators.required]);
    this.submitterName = new FormControl('', [Validators.required]);
    this.submitterSurname = new FormControl('', [Validators.required]);
    this.submitterFullName = new FormControl('');
    this.email = new FormControl('');
    this.phone = new FormControl('');
    this.peopleCount = new FormControl(1);
    this.subscribeFlag = new FormControl(false);
    this.comments = new FormControl('');
    this.generalAttend = new FormControl(undefined, [Validators.required]);

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
      submitterFullName: this.submitterFullName,
      generalAttend: this.generalAttend,
    });

    this.rsvpForm.get('attendCeremony')?.disable();
    this.rsvpForm.get('attendParty')?.disable();
    this.rsvpForm.get('submitterFullName')?.disable();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 2000);

    this.languageConfigSubscription =
      this.languageService.languageConfig$.subscribe((config) => {
        this.languageConfig = config;
      });
  }
  ngOnDestroy(): void {
    this.isLoading = false;
    if (this.languageConfigSubscription) {
      this.languageConfigSubscription?.unsubscribe();
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.spinner.show();

    try {
      setTimeout(() => {
        this.sendRsvpResponse();
        this.rsvpForm.reset();
        this.router.navigateByUrl('/thankyou');
        this.spinner.hide();
      }, 4000);
    } catch (err) {
      this.isLoading = false;
      this.spinner.hide();
      this.errorMessage =
        'There was an error during submission please try again!';
    }
  }

  onSubmitterChange() {
    this.submitterFullName.setValue(
      this.rsvpForm.controls['submitterName'].value +
        ' ' +
        this.rsvpForm.controls['submitterSurname'].value
    );
  }

  onCheckboxChange() {
    var willAttendChurch = this.rsvpForm.controls['attendCeremony'].value;
    var willAttendParty = this.rsvpForm.controls['attendParty'].value;

    this.submitterWillAttend = willAttendChurch || willAttendParty;
  }

  onRadioChange() {
    this.noAnswer = !this.rsvpForm.controls['generalAttend'].value;
    this.generalAttendanceFlag = this.rsvpForm.controls['generalAttend'].value;
    this.noAttendance =
      !this.generalAttendanceFlag || this.generalAttendanceFlag === 'No';

    if (this.noAttendance) {
      this.rsvpForm.get('attendCeremony')?.disable();
      this.rsvpForm.get('attendParty')?.disable();
    } else {
      this.rsvpForm.get('attendCeremony')?.enable();
      this.rsvpForm.get('attendParty')?.enable();
    }
  }

  onPeopleCountChange() {
    var numberOfPeople = this.rsvpForm.controls['peopleCount'].value as number;
    this.attendees = [];
    if (numberOfPeople - 1 > 0) {
      var arr_names: string[] = new Array(numberOfPeople - 1);
      var arr_names_temp: string[] = new Array(numberOfPeople - 1);
      for (let indx = 0; indx < numberOfPeople - 1; indx++) {
        arr_names[indx] = '';
        this.attendees = arr_names;
        this._atteendees = arr_names_temp;
      }
    }
  }

  onAttendeeChange(rowIndex: number) {
    var domElement = document.getElementById(
      'attendRow' + rowIndex
    ) as HTMLInputElement;
    if (domElement && rowIndex < this.attendees.length) {
      this._atteendees[rowIndex] = domElement.value;
    }
  }

  private sendRsvpResponse() {
    console.log('sending RSVP form via email');

    this._atteendees = this._atteendees.filter((value) => {
      return value && value !== '';
    });
    const submitterFullName =
      this.rsvpForm.controls['submitterName'].value +
      ' ' +
      this.rsvpForm.controls['submitterSurname'].value;

    emailjs.init('6cKvFXLfFf7eDWXKQ');

    if (this.noAttendance) {
      emailjs.send('service_vjkvo97', 'template_eit5n88', {
        rsvp_name: this.rsvpForm.controls['submitterName'].value,
        rsvp_lastname: this.rsvpForm.controls['submitterSurname'].value,
        rsvp_phone: this.rsvpForm.controls['phone'].value,
        rsvp_email: this.rsvpForm.controls['email'].value,
        rsvp_ceremony: 'No',
        rsvp_party: 'No',
        rsvp_people_count: 0,
        rsvp_people: '',
        rsvp_comments:
          'I will not come to the wedding: ' +
          this.rsvpForm.controls['comments'].value,
      });
    } else {
      emailjs.send('service_vjkvo97', 'template_eit5n88', {
        rsvp_name: this.rsvpForm.controls['submitterName'].value,
        rsvp_lastname: this.rsvpForm.controls['submitterSurname'].value,
        rsvp_phone: this.rsvpForm.controls['phone'].value,
        rsvp_email: this.rsvpForm.controls['email'].value,
        rsvp_ceremony:
          this.rsvpForm.controls['attendCeremony'].value ?? false
            ? 'Yes'
            : 'No',
        rsvp_party:
          this.rsvpForm.controls['attendParty'].value ?? false ? 'Yes' : 'No',
        rsvp_people_count: this.rsvpForm.controls['peopleCount'].value,
        rsvp_people:
          submitterFullName +
          (this._atteendees.length > 0 ? ', ' : '') +
          this._atteendees.join(', '),
        rsvp_comments: this.rsvpForm.controls['comments'].value,
      });
    }
  }
}
