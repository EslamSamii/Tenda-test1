import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flipColor = false;
  title = 'tenda';
  sideNavOpen = false;
  data:any;
  constructor(private api:ApiService) {

  }
  toggleDrawer(drawer:any){
    if(!drawer){
      this.sideNavOpen = true;
    }else{
      drawer.toggle()

    }
  }
  ngOnInit(): void {
    this.api.aboutUs().subscribe((res:any)=>{
      this.data = res.result[0]
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.onscroll = ()=>{
      if(window.scrollY>100){
        this.flipColor = true;
      }else{
        this.flipColor = false;

      }
    }
  }
  isHome(){
    return window.location.pathname === '/home'
  }
}
