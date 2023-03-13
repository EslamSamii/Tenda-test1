import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,16}$/;
  phoneRe = /^[0-9]{8,20}$/

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
    this.lname = new FormControl('');
    this.email = new FormControl('',[Validators.required,Validators.pattern(this.emailRe)]);
    this.phone = new FormControl('',[Validators.required,Validators.pattern(this.phoneRe)]);
    this.message = new FormControl('',[Validators.required]);
  }
  createForm(){
    this.es_form = new FormGroup({
      fname: this.fname,
      lname :this.lname,
      email:this.email,
      phone:this.phone,
      message:this.message,
    })
  }
  // end form

  bookBtn(){
    console.log('56wdqwd')
    this.isLoading = true;
    this.api.contactUs({
      client_first_name:this.fname.value,
      client_last_name:this.lname.value,
      client_phone_number:this.phone.value,
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
}
