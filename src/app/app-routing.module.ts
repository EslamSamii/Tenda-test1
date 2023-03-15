import { BookingComponent } from './pages/booking/booking.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdventureDetailsComponent } from './pages/adventure-details/adventure-details.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:"full"},
  {path:'home',component:HomeComponent,data: { animationState: 'One' }},
  {path:'explore',component:ExploreComponent,data: { animationState: 'Two' }},
  {path:'about',component:AboutUsComponent,data: { animationState: 'Three' }},
  {path:'contact-us',component:ContactUsComponent,data: { animationState: 'Four' }},
  {path:'adventure/:id',component:AdventureDetailsComponent,data: { animationState: 'Five' }},
  {path:'adventure/:id/book',component:BookingComponent,data: { animationState: 'Six' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
