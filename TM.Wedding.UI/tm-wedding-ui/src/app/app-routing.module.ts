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

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'wedding', component: WeddingPageComponent },  
  { path: 'about', component: AboutComponent },
  { path: 'info', component: InfoPageComponent },
  { path: 'rsvp', component: RsvpPageComponent },
  { path: 'gifts', component: GiftPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
