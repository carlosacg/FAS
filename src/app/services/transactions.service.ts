import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly URL_API = "https://backend-fas-uv.herokuapp.com/api/transactions";
  selectedTransaction: Transaction;
  transactionArray: Transaction[];

  constructor(private http: HttpClient) {
    this.selectedTransaction = new Transaction();
  }

  getTransactions(id: string) {//LEER
    return this.http.get(this.URL_API+ "/" + sessionStorage.getItem("id"));
  }

  postEgress(transaction: Transaction, number_item: string, descriptions: string) {//CREAR
    var f = new Date(); 
    let subcadena;

    if (transaction.account_number.substr(2, 1) == ' ') {
      subcadena = transaction.account_number.substr(1, 1);//UN DIGITO
    }
    if (transaction.account_number.substr(3, 1) == ' ') {
      subcadena = transaction.account_number.substr(1, 2);//DOS DIGITOS
    }
    if (transaction.account_number.substr(4, 1) == ' ') {
      subcadena = transaction.account_number.substr(1, 3);//TRES DIGITOS
    }
    if (transaction.account_number.substr(5, 1) == ' ') {
      subcadena = transaction.account_number.substr(1, 4);//CUATRO DIGITOS
    }
    
    transaction.account_number = subcadena;
    transaction.item_number = number_item;
    transaction.description = descriptions;
    console.log(transaction);
    return this.http.post(this.URL_API, transaction);
  }

  postIngress(transaction: Transaction) {//CREAR
    var f = new Date();
    transaction.item_number = "2";
    transaction.description = "Ingreso Nomina";
    return this.http.post(this.URL_API, transaction);
  }

  putTransaction(transaction: Transaction) {//ACTUALIZAR
    transaction.spent_date = transaction.spent_date.substring(0, 10);
    alert(transaction.spent_balance);
    return this.http.put(this.URL_API + "/" + transaction.transaction_number, transaction);
  }

  deleteTransaction(transaction_number: string) {//ELIMINAR
    return this.http.delete(this.URL_API + "/" + transaction_number);
  }

}
