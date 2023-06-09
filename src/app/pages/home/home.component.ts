import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  z_order:any = []
  ca1 = true;
  ca2 = false;
  ca3 = false;
  closeClass1 = false;
  closeClass2 = true;
  closeClass3 = true;
  sliders:any
  openClass1 = true;
  openClass2 = false;
  openClass3 = false;
  count = 1;
  close = 2;
  selectedSlider = 1;
  isProcessing=false;
  timer$:any;
  constructor(private api:ApiService) {

  }
  ngOnInit(): void {

    this.getSlider();
    this.getCategories()


  }
  ScrollLeft(element:any,num=450){
    let Left:any = element.scrollLeft -num

    element.scrollTo({
      left: Left,
      behavior: 'smooth'
    });
  }
  ScrollRight(element:any,num=450){
    let Left:any = element.scrollLeft +num

    element.scrollTo({
      left: Left,
      behavior: 'smooth'
    });

  }
  next(next:any){
    if(this.isProcessing == true)return;
    this.isProcessing = true;
    if(next===true){
      // this.selectedSlider = (this.selectedSlider+1)%this.sliders.length ? (this.selectedSlider+1)%this.sliders.length : 1;
      let prev_ID = this.z_order.findIndex((res:any)=> res == this.sliders.length);
      let next_ID = 0;
      let sliders_:any = [...this.sliders]
      for(let [key,val] of Object.entries(sliders_)){
        let val_:any= val;
        if(val_.id == this.selectedSlider){
          if(!sliders_[parseInt(key)+1] || sliders_[parseInt(key)+1] == undefined){
            next_ID =  sliders_[0].id;
          }else{
            next_ID = sliders_[parseInt(key) +1].id
          }
          break;
        }
      };

      this.selectedSlider = next_ID;
      this.close = prev_ID;
      setTimeout(()=>{
        for(let [key,order] of Object.entries(this.z_order)){
          this.z_order[key] = ((this.z_order[key]+1) % this.z_order.length) ==0? 1 :(this.z_order[key]+1) % this.z_order.length
        }
        this.isProcessing = false

      },600)


    }else if(next === false){
      let prev_ID = this.z_order.findIndex((res:any)=> res == this.sliders.length);
      let next_ID = 0;
      let sliders_:any = [...this.sliders]
      for(let [key,val] of Object.entries(sliders_)){
        let val_:any= val;
        if(val_.id == this.selectedSlider){
          if(!sliders_[parseInt(key)-1] || sliders_[parseInt(key)-1] == undefined){
            next_ID =  sliders_[sliders_.length-1].id;
          }else{
            next_ID = sliders_[parseInt(key) -1].id
          }
          break;
        }
      };

      this.selectedSlider = next_ID;
      this.close = prev_ID;
      setTimeout(()=>{
        for(let [key,order] of Object.entries(this.z_order)){
          this.z_order[key] = (this.z_order[key]-1) == 0? this.z_order.length-1 :(this.z_order[key]-1)
        }
        this.isProcessing = false;

      },600)
    }else{
      if(next == this.selectedSlider) {
        this.isProcessing = false;
        return
      }
      clearInterval(this.timer$)


      // this.selectedSlider = (this.selectedSlider+1)%this.sliders.length ? (this.selectedSlider+1)%this.sliders.length : 1;
      let prev_ID = this.z_order.findIndex((res:any)=> res == this.sliders.length);
      let prevP_ID = this.z_order.findIndex((res:any)=> res == this.sliders.length-1);
      let next_ID = next;
      let sliders_:any = [...this.sliders]

      this.selectedSlider = next_ID;
      this.close = prev_ID;
      this.z_order[prevP_ID] = this.z_order[next_ID];
      this.z_order[next_ID] = sliders_.length-1;

      setTimeout(()=>{
        this.z_order[prev_ID] = this.z_order[next_ID];
        this.z_order[next_ID] = sliders_.length;
        this.isProcessing = false;

        this.timer$ = setInterval(()=>{
          this.next(true)
        },6000)

      },600)

    }
  }
  setText(title:any){
    return title.replace('tenda','<span class="font3">tenda</span>')
  }
  getSlider(){
    this.api.slidersList().subscribe((res)=>{
      this.sliders = res;

      let length = this.sliders.length;
      let data_ = [...this.sliders]
      data_.map((data:any) =>{
        this.z_order[data.id] = length;
        length -- ;
      })
      this.selectedSlider = this.sliders[0].id;

    })
  }
  adventuresData:any;
  categories:any;
  adventures(id:any){
    this.api.adventuresList(id).subscribe((res:any)=>{
      if(id === ''){
        let categTrans = this.categories.filter((categ:any)=> categ.title.toLowerCase() == 'transportation')[0];
        this.adventuresData = res
        this.adventuresData.result = this.adventuresData.result.filter((r:any)=>r.category_id != categTrans.id);
      }else{
        this.adventuresData = res;

      }
    })
  }
  getCateg(id:any){
    if(this.categories){
      let name = this.categories.filter((f:any) => f.id == id);
      return name[0]
    }

  }
  getCategories(){
    this.api.categories().subscribe((res:any)=>{
      this.categories = res;
      this.adventures('');
    },
    (err)=>{
    }
    )
  }
}
