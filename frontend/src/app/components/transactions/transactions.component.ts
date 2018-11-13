import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { NgForm } from '@angular/forms';
import { Transaction } from '../../models/transaction';
declare var M: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers :[TransactionsService]

})




export class TransactionsComponent implements OnInit {

  constructor(private transactionService: TransactionsService) { }


  ngOnInit() {
    this.getTransactions();
  }

 
  addTransactions(form?:NgForm){//AGREGAR CUENTA
    console.log(form.value);
    this.transactionService.postTransaction(form.value).subscribe(res =>{
      this.resetForm(form);
      M.toast({html: 'Transaccion Creada satisfactoriamente'});
      this.getTransactions();
    })
}



  getTransactions(){//OBTENGO LA LISTA DE transactions
    this.transactionService.getTransactions().subscribe(res =>{
      this.transactionService.transactionArray = res as Transaction[];
    })
  }

  updateTransaction(transaction:Transaction, form:NgForm){//DADO EL ICONO DE SELECCIONAR MUESTRA LA INFO DEL REGISTRO
    this.transactionService.selectedTransaction= transaction;
    this.resetForm(form);
  }

  deleteTransaction(transaction_number:string,form: NgForm){
    if(confirm('¿Seguro que desea eliminar esta transaccion?')) {
      this.transactionService.deleteTransaction(transaction_number).subscribe(res => {
        M.toast({html: 'transaccion eliminado'});
        this.getTransactions();
          this.resetForm(form);
        });
    }
    this.getTransactions();
    this.ngOnInit();
  }

  resetForm(form?:NgForm){//LIMPIA LOS CAMPOS
    if(form){
      form.reset();
      this.transactionService.selectedTransaction = new Transaction();
      
    }
  }

  redirect(){
    location.reload(); 
  }

}
