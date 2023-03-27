import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  copyText= 'Copy'
  data:any;
  constructor(private api: ApiService) {
  }
  ngOnInit(): void {
    window.scrollTo({
      top: 0
    });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.api.aboutUs().subscribe((res:any)=>{
      this.data = res.result[0]
    })
  }
  setCopy(tooltip:any){
    this.copyText="Copied"
    tooltip.show();
  }
  initCopy(){
    this.copyText="Copy"
  }
  whatsappClick(){
    window.open(
      `https://wa.me/${this.data?.whatsapp_number}`,
      '_blank'
    );
  }
  sendEmail(){
    window.open(
      `mailto:${this.data?.email}`,
      '_blank'
    );
  }
}
