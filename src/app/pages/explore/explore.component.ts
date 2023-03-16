import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  isAll = false;
  categories:any;
  adventuresData:any

  isSelected4= false;
  constructor(private activatedRounte:ActivatedRoute,
    private router:Router,
    private api:ApiService){

  }
  transportation = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let f:any  = this.activatedRounte.snapshot.queryParams;
    if(!f.filter){
      this.router.navigateByUrl('/explore?filter=')

    }
    this.activatedRounte.queryParams.subscribe((params:any)=>{
      if(params.d && params.d == 'transportation')
        this.transportation = true;
      else
        this.transportation = false;



       if(params.filter && params.filter!=''){
        this.adventures(params.filter);
        this.isAll = false;

      }
      else{
        this.adventures('');
        this.isAll = true;
      }
    })
    this.getCategories()

  }
  getCategories(){
    this.api.categories().subscribe((res:any)=>{
      this.categories = res;
    },
    (err)=>{
    }
    )
  }
  adventures(id:any){
    this.api.adventuresList(id).subscribe((res:any)=>{
      this.adventuresData = res;
    })
  }
  getCateg(id:any){
    if(this.categories){
      let name = this.categories.filter((f:any) => f.id == id);
      return name[0]
    }

  }
}
