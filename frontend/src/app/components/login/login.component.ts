import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }

 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
 
  }
 correctLogin(){
    this.router.navigate(['/navigation']);
  }
  
}

