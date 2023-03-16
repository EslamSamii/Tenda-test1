import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LogoInTextPipe } from './logo-in-text.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoInTextPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LogoInTextPipe
  ]
})
export class SharedModule { }
