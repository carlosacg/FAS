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
  
  name: string = sessionStorage.getItem("name");
  picture: string = sessionStorage.getItem("picture");

  ngOnInit() {
  }


}
