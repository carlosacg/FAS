import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { NgForm } from '@angular/forms';
import { Account } from '../../models/account';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction';
import { LoginComponent } from '../../components/login/login.component'
declare var M: any;


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountService, TransactionsService, LoginComponent]
})
export class AccountsComponent implements OnInit {

  constructor(public accountService: AccountService, public transactionService: TransactionsService, public loginComponent: LoginComponent) { }
  ngOnInit() {
    this.getAccounts();
  }

  addAccount(form?: NgForm) {//AGREGAR CUENTA
    if (form.value.account_number) {//SI EL INPUT ID HIDDEN ESTA LLENO ACTUALIZO EL CUENTA
      console.log(form.value);
      this.accountService.putAccount(form.value, sessionStorage.getItem("id")).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Cuenta Actualizado satisfactoriamente' });
        this.getAccounts();
      });
    } else {//SI NO HAY ID, INSERTO EL CUENTA
      this.accountService.postAccount(form.value, sessionStorage.getItem("id")).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Cuenta Creada satisfactoriamente' });
        this.getAccounts();

      })
    }
  }


  getAccounts() {//OBTENGO LA LISTA DE USUARIOS
    this.accountService.getAccounts(sessionStorage.getItem("id")).subscribe(res => {
      this.accountService.accountArray = res as Account[];
    })
  }

  getTransactions() {//OBTENGO LA LISTA DE transactions
    this.transactionService.getTransactions(sessionStorage.getItem("id")).subscribe(res => {
      this.transactionService.transactionArray = res as Transaction[];
    })
  }
  updateAccount(account: Account, form: NgForm) {//DADO EL ICONO DE SELECCIONAR MUESTRA LA INFO DEL REGISTRO
    this.accountService.selectedAccount = account;
    this.resetForm(form);
  }

  deleteAccount(account_number: string, form: NgForm) {
    if (confirm('¿Seguro que desea eliminar esta cuenta bancaria?')) {
      this.accountService.deleteAccount(account_number).subscribe(res => {
        M.toast({ html: 'cuenta eliminado' });
        this.getAccounts();
        this.resetForm(form);
      });
    }
    this.getAccounts();
    this.ngOnInit();
  }

  insertIncome(account: Account, form: NgForm) {
    let transaction = new Transaction();
    var reply = prompt("INSERTE SALDO A SU CUENTA", "");
    if (reply == undefined) {
      alert("HA CANCELADO LA OPERACION");
    } else if (reply == "") {
      alert("NO HA INSERTADO MONTO");
    } else {
      if (Number.isInteger(parseInt(reply))) {
        alert("MONTO A INSERTAR: " + reply);
        account.positive_balance = account.positive_balance + parseInt(reply);
        transaction.account_number = account.account_number;
        transaction.spent_balance = reply;
        this.transactionService.postIngress(transaction).subscribe(res => {
          M.toast({ html: 'Transaccion Creada satisfactoriamente' });
          this.getTransactions();
        })
        this.accountService.selectedAccount = account; //ACTUALIZA LA LISTA
        this.accountService.putAccount(account,sessionStorage.getItem("id")).subscribe(res => { //ACTUALIZA SALDO EN LA BASE DE DATOS
          this.resetForm(form);//REINICIA EL FORMULARIO
          M.toast({ html: 'INGRESO REALIZADO EXITOSAMENTE' });
          this.getAccounts();
        });
      } else {
        alert("INSERTE UN VALOR NUMERICO");

      }
    }
  }

  resetForm(form?: NgForm) {//LIMPIA LOS CAMPOS
    if (form) {
      form.reset();
      this.accountService.selectedAccount = new Account();

    }
  }

  redirect() {
    location.reload();
  }

}
