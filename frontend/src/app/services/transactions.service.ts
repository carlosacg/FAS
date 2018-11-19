import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly URL_API="http://localhost:3000/api/transactions";
  selectedTransaction : Transaction;
  transactionArray : Transaction[];

  constructor(private http: HttpClient) {
    this.selectedTransaction = new Transaction();
   }

  getTransactions(){//LEER
    return this.http.get(this.URL_API);     
  }

  postEgress(transaction:Transaction , number_item:string, descriptions:string){//CREAR
    var f = new Date();
    let subcadena = transaction.account_number.substr(1,1);
    transaction.account_number = subcadena;
    transaction.item_number = number_item;
    transaction.description = descriptions;
    transaction.spent_date = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
    return this.http.post(this.URL_API,transaction);
  }
  postIngress(transaction:Transaction){//CREAR
    var f = new Date();
    transaction.spent_date = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
    transaction.item_number = "2";
    return this.http.post(this.URL_API,transaction);
  }
  putTransaction(transaction:Transaction){//ACTUALIZAR
    transaction.spent_date=transaction.spent_date.substring(0,10);
    return this.http.put(this.URL_API +"/"+ transaction.transaction_number,transaction);
  }

  deleteTransaction(transaction_number:string){//ELIMINAR
    return this.http.delete(this.URL_API +"/" +transaction_number);
  }

}
