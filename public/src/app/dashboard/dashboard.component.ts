import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  curUser;
  users;

  newItem = {
  	title: '',
  	desc: '',
  	tag: ''
  };

  errors;

  constructor(private _http:HttpService, private _router:Router) {
  	this.getCurrentUser();
  	this.getUsers();
  }

  ngOnInit() {
  }

  getCurrentUser(){
  	this._http.getCurrentUser()
  	.then(res=>{
  		this.curUser = res;
  	})
  	.catch();
  }

  getUsers(){
  	this._http.getUsers()
  	.then(res=>{
  		this.users = res;
  	})
  	.catch();
  }

  addItem(){
  	this._http.addItem(this.newItem, this.curUser.name)
  	.then(res=>{
      console.log(res);
      if(typeof res != 'boolean'){
        this.errors = res;
      }
      else{
        this.errors = null;
      }
  		this.getCurrentUser();
  		this.getUsers();
  	})
  	.catch();
  }

  toggleItem(id){
  	console.log('toggle comp')
  	this._http.toggleItem(id)
  	.then(res=>{
  		this.getCurrentUser();
  		this.getUsers();
  	})
  	.catch();
  }
}
