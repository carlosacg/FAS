import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { NgForm } from '@angular/forms';
import { Transaction } from '../../models/transaction';
import { LoginComponent } from '../../components/login/login.component'

declare var M: any;
declare var transactionId: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers :[TransactionsService,LoginComponent]

})




export class TransactionsComponent implements OnInit {

  constructor(public loginComponent:LoginComponent,public transactionService: TransactionsService) { }


  ngOnInit() {
    this.getTransactions();
  }

 
  addTransactions(form?:NgForm){//AGREGAR CUENTA
    console.log(form.value);
    this.transactionService.putTransaction(form.value).subscribe(res =>{
      this.resetForm(form);
      M.toast({html: 'Transaccion Creada satisfactoriamente'});
      this.getTransactions();
    })
}



  getTransactions(){//OBTENGO LA LISTA DE transactions
    this.transactionService.getTransactions(this.loginComponent.getIdentification()).subscribe(res =>{
      let transactions=this.transactionService.transactionArray = res as Transaction[];
      console.log(transactions);
    })
  }

  updateOverFlowTransactions(transactions:Transaction, form:NgForm){//DADO EL ICONO DE SELECCIONAR MUESTRA LA INFO DEL REGISTRO

    this.transactionService.selectedTransaction= transactions;
    this.resetForm(form);
    transactionId = transactions.account_number;
  }

  updateTransaction(form?:NgForm){
    this.transactionService.putTransaction(form.value).subscribe(res=>{ 
      M.toast({html: 'ACTUALIZACION REALIZADA EXITOSAMENTE'});
      this.getTransactions();
      });
    
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
