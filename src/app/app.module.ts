import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { AdventureDetailsComponent } from './pages/adventure-details/adventure-details.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BookingComponent } from './pages/booking/booking.component';
import { TransportationComponent } from './pages/transportation/transportation.component';
import { SharedModule } from './shared/shared.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    AdventureDetailsComponent,
    ContactUsComponent,
    BookingComponent,
    TransportationComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    NgxIntlTelInputModule,
    MatMenuModule

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
