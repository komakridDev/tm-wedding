import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard'

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { WeddingCounterComponent } from './wedding-counter/wedding-counter.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { CoupleInfoComponent } from './couple-info/couple-info.component';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { WeddingPageComponent } from './wedding-page/wedding-page.component';
import { RsvpPageComponent } from './rsvp-page/rsvp-page.component';
import { LoginComponent } from './login/login.component';
import { GiftPageComponent } from './gift-page/gift-page.component';
import { AboutComponent } from './about/about.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContactSubmitComponent } from './contact-submit/contact-submit.component';
import { ThankYouNegativeComponent } from './thank-you-negative/thank-you-negative.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    WeddingCounterComponent,
    HomeCarouselComponent,
    FooterComponent,
    CoupleInfoComponent,
    HomeDetailsComponent,
    WeddingPageComponent,
    RsvpPageComponent,
    LoginComponent,
    GiftPageComponent,
    AboutComponent,
    ContactPageComponent,
    InfoPageComponent,
    ThankYouComponent,
    ThankYouNegativeComponent,
    ContactSubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({type: 'square-jelly-box'}),
    ClipboardModule
  ],
  exports: [
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
