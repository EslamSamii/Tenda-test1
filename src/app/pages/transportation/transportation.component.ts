import { ApiService } from './../../services/api.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { CURRENCY } from 'src/app/shared/countryData';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'node_modules/ngx-intl-tel-input-gg';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent {
  selectedIMG:any = ''
  URL:any = window.location
  @Input('CategId') CategId:any
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
  isLoading = false;
  isSuccess = false;
  isReturn = false;
  es_form: any;
  dateFrom:any;
  dateTo:any;
  persons:any;
  fromPlace:any;
  toPlace:any;
  fname:any;
  lname:any;
  email:any;
  phone:any;
  totalPrice:any
  zones:any
  zones1:any;
  zones2:any;
  adventureData:any;
  categories:any;
  categ:any;
  filteredOptions: Observable<any[]> | any;
  filteredtoPlace: Observable<any[]> | any;
  data:any;

  domain = env.domain.slice(0,env.domain.length-1)
  emptyImg = 'assets/images/emptyImg.jpg';

  constructor(private api:ApiService) {
  }
  ngOnInit() {
    window.scrollTo({
      top: 0
    });
    this.api.aboutUs().subscribe((res:any)=>{
      this.data = res.result[0]
    })

    this.api.adventuresDetails(this.CategId).subscribe((res:any)=>{
      this.adventureData = res.result;
      this.getCategory(res.result.category_id);
    });
      // controls
      this.initFormControles()
      //form creation
      this.createForm();
    this.getZones()
  }
  getCategory(id:any){
    this.api.categories().subscribe((res:any)=>{
      this.categories = res;
      this.getCateg(id)
    },
    (err)=>{
      console.log(err)
    }
    )
  }
  getCateg(id:any){
    let name = this.categories.filter((f:any) => f.id == id);
    this.categ = name[0]
  }
  initFilters(){
    this.filteredOptions = this.fromPlace.valueChanges.pipe(
      startWith(''),
      map((value:any) => {

        const name = value;
        return name ? this._filter(name as string) : this.zones1.slice();
      }),
    );

    this.filteredtoPlace = this.toPlace.valueChanges.pipe(
      startWith(''),
      map((value:any) => {
        const name = typeof value === 'string' ? value : value?.title;
        return name ? this._filter(name as string) : this.zones2.slice();
      }),
    );
  }
  // start form
  initFormControles(){
    this.dateFrom = new FormControl('',[Validators.required]);
    this.persons = new FormControl('1',[Validators.required]);
    this.fromPlace = new FormControl('',[Validators.required]);
    this.toPlace = new FormControl('',[Validators.required]);
    this.fname = new FormControl('',[Validators.required]);
    this.lname = new FormControl('',[Validators.required]);
    this.email = new FormControl('',[Validators.required,Validators.pattern(this.emailRe)]);
  }
  createForm(){
    this.es_form = new FormGroup({
      dateFrom: this.dateFrom,
      persons:this.persons,
      fromPlace:this.fromPlace,
      toPlace:this.toPlace,
      fname:this.fname,
      lname:this.lname,
      email:this.email,
    })
  }
  // end form
  displayFn(user: any): string {
    return user && user ? user : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.zones.filter((option:any) => option.title.toLowerCase().includes(filterValue));
  }
  bookBtn(){
    this.isLoading = true;
    let body:any = {
      location: this.zones.filter((z:any) => z.title === this.fromPlace.value)[0].id,
      destination:this.zones.filter((z:any) => z.title === this.toPlace.value)[0].id,
      flight_arrival_date:this.dateFrom.value,
      no_of_persons:this.persons.value,
      price:this.totalPrice ? this.totalPrice : this.adventureData.price,
      round_trip:this.isReturn,
      client_email:this.email.value,
      client_first_name:this.fname.value,
      client_last_name:this.lname.value,
      client_phone_number:this.phone.number,
    }
    if(this.isReturn){
      body = {...body,
        flight_departure_date:this.dateTo
      }
    }
    this.api.createOrder(body).subscribe(
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
  calcPrice(){
    if(
      this.fromPlace.value &&
      this.toPlace.value &&
      this.dateFrom.value &&
      this.persons.value
    ){

      let body:any = {
        location: this.zones.filter((z:any) => z.title === this.fromPlace.value)[0].id,
        destination:this.zones.filter((z:any) => z.title === this.toPlace.value)[0].id,
        flight_arrival_date:this.dateFrom.value,
        round_trip:this.isReturn,
        no_of_persons:this.persons.value,
        flight_departure_date:this.dateTo ? this.dateTo : this.dateFrom.value

      }

      this.api.calcPrice(body).subscribe((res:any)=>{
        this.totalPrice = res.result.price
      })
    }

  }
  onChange(e:any){
    if(e.target.checked){
      this.isReturn = true;
    }
    else {
      this.isReturn = false;
      this.dateTo = ''
    }
  }
  getZones(){
    this.api.zones().subscribe((res:any)=>{
      this.zones= res.result;
      this.zones1= res.result;
      this.zones2= res.result;
      this.initFilters()
    });
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
  onChange0(){
    setTimeout(() => {
      this.phoneTouched = true
      this.maxNum = 100;
      },5)
    }
}
