import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login={name:''};

  errors;

  constructor(private _http:HttpService, private _router:Router) {
    this.logout();
  }

  ngOnInit() {
  }

  loginUser(){
  	this._http.loginUser(this.login)
  	.then(res=>{
  		console.log('made it back to component after login');
      console.log(res);
      if(typeof res != 'boolean'){
        this.errors = res;
      }
      else{
        this.errors = null;
        this._router.navigate(['dashboard']);
      }
  	})
  	.catch();
  }

  logout(){
    this._http.logout()
    .then(res=>{
      this._router.navigate(['/']);
    })
    .catch();
  }
}
