import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeddingPageComponent } from './wedding-page/wedding-page.component';
import { RsvpPageComponent } from './rsvp-page/rsvp-page.component';
import { AboutComponent } from './about/about.component';
import { GiftPageComponent } from './gift-page/gift-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ContactSubmitComponent } from './contact-submit/contact-submit.component';
import { ThankYouNegativeComponent } from './thank-you-negative/thank-you-negative.component';

const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'wedding', component: WeddingPageComponent, canActivate: [AuthGuard] },  
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'info', component: InfoPageComponent, canActivate: [AuthGuard] },
  { path: 'rsvp', component: RsvpPageComponent, canActivate: [AuthGuard] },
  { path: 'gifts', component: GiftPageComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactPageComponent, canActivate: [AuthGuard] },
  { path: 'thankyou', component: ThankYouComponent, canActivate: [AuthGuard] },
  { path: 'thankyounegative', component: ThankYouNegativeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contactsubmit', component: ContactSubmitComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
