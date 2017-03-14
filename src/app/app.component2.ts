import {OnInit, Component } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {GlobalService} from './global-service.service'
@Component({
  selector: 'app2-root',
template:'<p *ngIf="!response">{{title1}}</p><p *ngIf="!response">{{userId}}</p>{{response}} <button pButton type="button" (click)="function()" *ngIf="!response" label="Click"></button>'
})
export class AppComponent2 {
  userId:any;
  response:any;
  constructor(private a:ActivatedRoute,private globalService:GlobalService){
    this.a.params.subscribe((params: Params) => {
        this.userId = params['id'];
        console.log("Hello new",this.userId);
      });
  }
  function(){
    let url="https://lensclues.sia.co.in/cart/gettocartbyuserid/5886da7adbde75173bfb0eb0";
    this.globalService.GetRequest(url).subscribe(data=>{
      console.log(data[0],"Data from Cart",data[0].json.data.cartTotal);
      this.response=data[0].json.data.cartTotal;
      //console.log(this.response,'ravindra')
    })
  }
  title1 = 'Hello word!';
}

