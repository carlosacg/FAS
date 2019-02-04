import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';


import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angular-6-social-login";

declare var M: any;
var name: string;
var id: string;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  ngOnInit() {
    this.getUsers();
  }

  constructor( private socialAuthService: AuthService, public usersService: UserService, private router: Router ) {}
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    let isDone: boolean;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        let user = new User();
        user.identification = userData.id;
        user.user_name = userData.name.split(' ')[1];
        user.last_name = userData.name.split(' ')[2];
        user.email = userData.email;
        user.user_name = userData.name;
        user.picture = userData.image;
        name = userData.name.split(' ')[2];
        id = userData.id;
        console.log(name);
        isDone = true
        this.usersService.postUser(user).subscribe(res =>{
          M.toast({html: 'Usuario Creado satisfactoriamente'});
          this.getUsers();
          isDone = true
          return isDone;
        })
        console.log("pase");

        if(isDone == true){
          this.onLoginClick();
        }
      }
    );
    
  }

  getName(){
    console.log(name)
    return name;
  }
  getIdentification(){
    console.log(id)
    return  id;
  }
  getUsers(){//OBTENGO LA LISTA DE USUARIOS
    this.usersService.getUsers().subscribe(res =>{
      this.usersService.userArray = res as User[];
    })
  }

  public onLoginClick(){
    this.router.navigate(['./navigation']);
}

}

