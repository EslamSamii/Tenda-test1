import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { environment as env } from '../../../environments/environment';


@Component({
  selector: 'app-adventure-details',
  templateUrl: './adventure-details.component.html',
  styleUrls: ['./adventure-details.component.scss']
})
export class AdventureDetailsComponent {
  domain = env.domain.slice(0,env.domain.length-1)
  categories:any;
  adventureData:any;
  categ:any;
  emptyImg = 'assets/images/emptyImg.jpg';
  constructor(private api:ApiService, private activatedRoute:ActivatedRoute) {

  }
  ngOnInit(): void {
    let params:any = this.activatedRoute.snapshot.params;
    this.api.adventuresDetails(params.id).subscribe((res:any)=>{
      this.adventureData = res.result;
      this.getCategory(res.result.category_id);
    });
  }
  getUrl(){
    return window.location.toString()
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
}
