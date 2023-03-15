import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input('flipColor') flipColor =false;
  @Output('toggleDrawer') toggleDrawer_ = new EventEmitter()
  constructor(private renderer:Renderer2){}
  ngOnInit(): void {


  }
  toggleDrawer(){
      this.toggleDrawer_.emit(true);
  }
  isHome(){
    return window.location.pathname === '/home'
  }
}
