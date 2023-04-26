import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CURRENCY } from 'src/app/shared/countryData';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'node_modules/ngx-intl-tel-input-gg';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  clicked = false
  countryCode:any = 'us';
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  currentVal:any;

  maxNum = 10;
  COUNTRY_DATA = CURRENCY

  emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,16}$/;
  numbersOnly= /^\d*$/;

  es_form: any;
  fname:any;
  lname:any;
  phone:any;
  email:any;
  isSuccess = false;
  message:any;
  isLoading = false;
  phone_:any;
  constructor(private api:ApiService) {
  }
  ngOnInit(): void {
    window.scrollTo({
      top: 0
    });
    // controls
    this.initFormControles()
    //form creation
    this.createForm();
  }
  // start form
  initFormControles(){
    this.phone = new FormControl({},[Validators.required]);
    this.fname = new FormControl('',[Validators.required]);
    this.lname = new FormControl('',[Validators.required]);
    this.email = new FormControl('',[Validators.required,Validators.pattern(this.emailRe)]);
    this.message = new FormControl('',[Validators.required]);
  }
  createForm(){
    this.es_form = new FormGroup({
      phone: this.phone,
      fname: this.fname,
      lname :this.lname,
      email:this.email,
      message:this.message,
    })
  }
  // end form

  bookBtn(){
    this.isLoading = true;
    this.api.contactUs({
      client_first_name:this.fname.value,
      client_last_name:this.lname.value,
      client_phone_number:this.phone.value.e164Number,
      client_email:this.email.value,
      message:this.message.value,
    }).subscribe(
      (res:any)=>{
        this.isLoading = false;
        this.isSuccess = true;
      },
      (err)=>{
        this.isLoading = false;
        this.isSuccess = false;
      }
    )
  }
  prevVal:any = '';
  phoneValid =false;
  emptyNum:any = true;
  phoneTouched = false;
}
