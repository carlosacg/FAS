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

  postTransaction(transaction:Transaction){//CREAR
    return this.http.post(this.URL_API,transaction);
  }

  putTransaction(transaction:Transaction){//ACTUALIZAR
    return this.http.put(this.URL_API +"/"+ transaction.transaction_number,transaction);
  }

  deleteTransaction(transaction_number:string){//ELIMINAR
    return this.http.delete(this.URL_API +"/" +transaction_number);
  }

}
