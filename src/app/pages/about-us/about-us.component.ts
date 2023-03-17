import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
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
}
