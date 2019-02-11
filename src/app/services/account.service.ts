import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly URL_API = "http://localhost:3000/api/accounts";
  selectedAccount: Account;
  accountArray: Account[];


  constructor(private http: HttpClient) {
    this.selectedAccount = new Account();
  }

  getAccounts(id: string) {//LEER
    return this.http.get(this.URL_API);
    //return this.http.get(this.URL_API + "/" + id);
  }

  postAccount(account: Account, id: string) {//CREAR
    account.identification = id; //INSERTO EL ID DEL USUARIO LOGUEADO
    console.log(account);
    return this.http.post(this.URL_API, account);
  }

  putAccount(account: Account, id: string) {//ACTUALIZAR
    return this.http.put(this.URL_API + "/" + account.account_number, account);
  }

  deleteAccount(account_number: string, id: string) {//ELIMINAR
    return this.http.delete(this.URL_API + "/" + account_number);
  }

}

