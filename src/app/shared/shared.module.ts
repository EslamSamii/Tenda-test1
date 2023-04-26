import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LogoInTextPipe } from './logo-in-text.pipe';
import { DateFIxPipe } from './dateFIx.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoInTextPipe,
      DateFIxPipe,

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
    LogoInTextPipe,
    DateFIxPipe
  ]
})
export class SharedModule { }
