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
  constructor(private api:ApiService) {
  }
  ngOnInit(): void {
    // controls
    this.initFormControles()
    //form creation
    this.createForm();

  }
  // start form
  initFormControles(){
    this.fname = new FormControl('',[Validators.required]);
    this.lname = new FormControl('',[Validators.required]);
    this.email = new FormControl('',[Validators.required,Validators.pattern(this.emailRe)]);
    this.message = new FormControl('',[Validators.required]);
  }
  createForm(){
    this.es_form = new FormGroup({
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
      client_phone_number:this.phone.number,
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
  onChange2(){
    setTimeout(() => {
      let intNum:any = 0
      if(this.phone && this.phone.number){
        intNum=parseInt(this.phone.number.replace(/[- \\(\\)]*/g,''));
        this.emptyNum = this.phone.number.replace(/[- \\(\\)]*/g,'').length;
        this.emptyNum == 0 ? this.emptyNum = true: this.emptyNum = false;
        this.phoneValid = this.numbersOnly.test(intNum);

      }else{
      this.emptyNum = true;

      }

      // libphonenumber
      if(this.phone && this.phone.number && this.phone.number.replace(/[- \\(\\)+]*/g,'').length < 10){
        this.phone.number = this.phone.number.slice(-10);
        this.maxNum = 10;
        return ;
      }
        if(this.phone?.number){
          let mobileData = this.phone ? JSON.parse(JSON.stringify(this.phone)) : {}
          if(this.currentVal == mobileData?.number.replace(/[- \\(\\)+]*/g,'')) {
            this.maxNum = 10;
            return
          };
          let num_ = mobileData.number.replace(/[- \\(\\)+]*/g,'');
          let num = num_.slice(-10);
          let phonePrefix = num_.replace(num,'')
          this.currentVal = num;
          let country:any = this.COUNTRY_DATA.filter((c:any)=>c['phone'] ==parseInt(phonePrefix))

          // this.countryCode = country[0].code.toLowerCase();
          if(country[0] && country[0].code){
            this.phone ={
                countryCode:country[0].code,
                dialCode:'+'+phonePrefix,
                e164Number:'+'+num_,
                internationalNumber:'+'+phonePrefix+' '+num,
                nationalNumber:num_,
                number:num
            }
            intNum=parseInt(this.phone.number.replace(/[- \\(\\)+]*/g,''));
            this.phoneValid = this.numbersOnly.test(intNum);
            this.maxNum = 10;
          }
          this.maxNum = 10;

      }

    }, 5);

  }
  onChange(){
    setTimeout(() => {
      this.phoneTouched = true
      this.maxNum = 100;
      },5)
    }
}
