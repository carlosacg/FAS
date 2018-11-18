import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from '../login/login.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor( ) { }

  @ViewChild(LoginComponent) login: LoginComponent;

  ngOnInit() {
  }

  getName(){

  }
}
