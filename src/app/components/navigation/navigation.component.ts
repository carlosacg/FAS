import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';
import { User } from '../../models/user';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [LoginComponent]

})
export class NavigationComponent implements OnInit {
  

  constructor( public loginComponent: LoginComponent) { }
  
  name: string = this.loginComponent.getName();
  picture: string = this.loginComponent.getImageProfile();

  ngOnInit() {
    this.loginComponent.getIdentification();
    this.loginComponent.getName();
    this.loginComponent.getImageProfile();
  }


}
