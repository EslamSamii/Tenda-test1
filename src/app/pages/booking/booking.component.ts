import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CURRENCY } from 'src/app/shared/countryData';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'node_modules/ngx-intl-tel-input-gg';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  countryCode:any = 'us';
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;


  maxNum = 10;
  COUNTRY_DATA = CURRENCY

  emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,16}$/;
  numbersOnly= /^\d*$/;

  adventureData:any
  categories:any;
  isSuccess = false;
  isLoading = false;

  phoneRe = /^[0-9]{8,20}$/
  es_form: any;
  fname:any;
  lname:any;
  phone:any;
  email:any;

  constructor(private activatedroute:ActivatedRoute,private api:ApiService) {
  }
  ngOnInit(): void {
    window.scrollTo({
      top: 0
    });
    this.getCategories()
    // controls
    this.initFormControles()
    //form creation
    this.createForm();

    let params:any = this.activatedroute.snapshot.params
    this.api.adventuresDetails(params.id).subscribe(
      (res:any)=>{
        this.adventureData = res.result
    })
  }
  // start form
  initFormControles(){
    this.phone = new FormControl({},[Validators.required]);
    this.fname = new FormControl('',[Validators.required]);
    this.lname = new FormControl('',[Validators.required]);
    this.email = new FormControl('',[Validators.required,Validators.pattern(this.emailRe)]);
  }
  createForm(){
    this.es_form = new FormGroup({
      phone: this.phone,
      fname: this.fname,
      lname :this.lname,
      email:this.email,
    })
  }
  // end form
  bookBtn(){
    this.isLoading = true;
    this.api.createOrder({
      client_first_name:this.fname.value,
      client_last_name:this.lname.value,
      client_phone_number:this.phone.value.e164Number,
      client_email:this.email.value,
      adventure:this.adventureData.id,
    }).subscribe(
      (res)=>{
      this.isLoading = false;
      this.isSuccess = true;
    },
    (err)=>{
      this.isLoading = false;
      console.log(err)
    }
    )
  }
  getCategories(){
    this.api.categories().subscribe((res:any)=>{
      this.categories = res;
    },
    (err)=>{
      console.log(err)
    }
    )
  }
  getCateg(id:any){
    if(this.categories){
      let name = this.categories.filter((f:any) => f.id == id);
      return name[0]
    }
  }


}
