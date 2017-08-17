import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sub:Subscription;
  curUser;
  detailUser;
  done;
  pending;

  constructor(private _route:ActivatedRoute, private _http:HttpService) {
  	this.sub = this._route.params.subscribe(params=>{
  		this.details(params.name);
  	});
  	this.getCurrentUser();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  	this.sub.unsubscribe();
  }

  getCurrentUser(){
  	this._http.getCurrentUser()
  	.then(res=>{
  		this.curUser = res;
  	})
  	.catch();
  }

  details(name){
  	console.log(name);
  	this._http.details(name)
  	.then(res=>{
  		this.detailUser = res;
  		this.sortItems(this.detailUser.items);
  	})
  	.catch();
  }

  toggleItem(id){
  	console.log('toggle comp')
  	this._http.toggleItem(id)
  	.then(res=>{
  		this.getCurrentUser();
  		this.details(this.detailUser.name);
  	})
  	.catch();
  }

  sortItems(items){
  	this.done = [];
  	this.pending = [];
  	for(let item of this.detailUser.items){
  		if(item.complete){
  			this.done.push(item);
  		}
  		else{
  			this.pending.push(item);
  		}
  	}
  }
}
