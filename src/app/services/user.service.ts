import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly URL_API = "https://backend-fas-uv.herokuapp.com/api/users";
  
  selectedUser: User;
  userArray: User[];

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  getUsers() {//LEER
    return this.http.get(this.URL_API);
  }

  postUser(user: User) {//CREAR
    return this.http.post(this.URL_API, user);
  }

  putUser(user: User) {//ACTUALIZAR
    return this.http.put(this.URL_API + "/" + user.identification, user);
  }

  deleteUser(identification: number) {//ELIMINAR
    return this.http.delete(this.URL_API + "/" + identification);
  }
}
