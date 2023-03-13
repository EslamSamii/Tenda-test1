import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  adventureData:any
  categories:any;
  isSuccess = false;
  isLoading = false;

  emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,16}$/;
  phoneRe = /^[0-9]{8,20}$/
  es_form: any;
  fname:any;
  lname:any;
  phone:any;
  email:any;

  constructor(private activatedroute:ActivatedRoute,private api:ApiService) {
  }
  ngOnInit(): void {
    this.getCategories()
    // controls
    this.initFormControles()
    //form creation
    this.createForm();

    let params:any = this.activatedroute.snapshot.params
    console.log(params.id)
    this.api.adventuresDetails(params.id).subscribe(
      (res:any)=>{
        console.log(res)
        this.adventureData = res.result
    })
  }
  // start form
  initFormControles(){
    this.fname = new FormControl('',[Validators.required]);
    this.lname = new FormControl('');
    this.email = new FormControl('',[Validators.required,Validators.pattern(this.emailRe)]);
    this.phone = new FormControl('',[Validators.required,Validators.pattern(this.phoneRe)]);
  }
  createForm(){
    this.es_form = new FormGroup({
      fname: this.fname,
      lname :this.lname,
      email:this.email,
      phone:this.phone
    })
  }
  // end form
  bookBtn(){
    this.isLoading = true;
    this.api.createOrder({
      client_first_name:this.fname.value,
      client_last_name:this.lname.value,
      client_phone_number:this.phone.value,
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
    let name = this.categories.filter((f:any) => f.id == id);
    console.log(name)
    return name[0]
  }
}
