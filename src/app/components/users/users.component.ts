import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';

declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  addUser(form?: NgForm) {//AGREGAR USUARIO
    if (form.value.identification) {//SI EL INPUT ID HIDDEN ESTA LLENO ACTUALIZO EL USUARIO
      this.userService.putUser(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Usuario Actualizado satisfactoriamente' });
        this.getUsers();
      });
    } else {//SI NO HAY ID, INSERTO EL USUARIO
      this.userService.postUser(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Usuario Creado satisfactoriamente' });
        this.getUsers();

      })
    }
  }


  getUsers() {//OBTENGO LA LISTA DE USUARIOS
    this.userService.getUsers().subscribe(res => {
      this.userService.userArray = res as User[];
    })
  }

  updateUser(user: User) {//DADO EL ICONO DE SELECCIONAR MUESTRA LA INFO DEL REGISTRO
    this.userService.selectedUser = user;
  }

  deleteUser(identification: number, form: NgForm) {
    if (confirm('¿Seguro que desea eliminar este usuario?')) {
      this.userService.deleteUser(identification).subscribe(res => {
        M.toast({ html: 'Usuario eliminado' });
        this.getUsers();
        this.resetForm(form);
      });
    }
    this.getUsers();
    this.ngOnInit();
  }

  resetForm(form?: NgForm) {//LIMPIA LOS CAMPOS
    if (form) {
      form.reset();
      this.userService.selectedUser = new User();

    }
  }
}
