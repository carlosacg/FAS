import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { ItemService } from '../../services/item.service';
import { TransactionsService } from '../../services/transactions.service';
import { AccountService } from '../../services/account.service';
import { NgForm } from '@angular/forms';
import { Budget } from '../../models/budget';
import { Item } from '../../models/item';
import { Transaction } from '../../models/transaction';
import { Account } from '../../models/account';
import { LoginComponent } from '../../components/login/login.component'


declare var M: any;
var number_items: string;
var description: string;



@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  providers :[BudgetService,ItemService,TransactionsService, AccountService,LoginComponent]

})
export class BudgetComponent implements OnInit {
  constructor(public loginComponent:LoginComponent,public budgetService: BudgetService,public itemService: ItemService, public transactionService:TransactionsService, public accountService:AccountService) { }

  ngOnInit() {
    this.getBudgets();
    this.getItems();
    this.getTransactions();
    this.getAccounts();
    this.calculateTotal();

  }

  addBudget(form?:NgForm){//AGREGAR CUENTA
      this.budgetService.postBudget(form.value,this.loginComponent.getIdentification()).subscribe(res =>{
        this.resetForm(form);
        M.toast({html: 'Presupuesto Creada satisfactoriamente'});
        this.getBudgets();
        this.getItems();
      })
  }

  addItem(form?:NgForm){//AGREGAR CUENTA
    this.itemService.postItem(form.value).subscribe(res =>{
      this.resetForm(form);
      M.toast({html: 'Item Creada satisfactoriamente'});
      this.ngOnInit()
    })
}
 
addTransactions(form?:NgForm){//AGREGAR TRANSACCION

  this.transactionService.postEgress(form.value, number_items, description).subscribe(res =>{
    this.resetForm(form);
    M.toast({html: 'Transaccion Creada satisfactoriamente'});
    this.getTransactions();
  })
}

  getBudgets(){//OBTENGO LA LISTA DE USUARIOS
    this.budgetService.getBudgets(this.loginComponent.getIdentification()).subscribe(res =>{
      this.budgetService.budgetArray = res as Budget[];
    })
  }
  getAccounts(){//OBTENGO LA LISTA DE USUARIOS
    this.accountService.getAccounts(this.loginComponent.getIdentification()).subscribe(res =>{
      this.accountService.accountArray = res as Account[];
    })
  } 


  getItems(){//OBTENGO LA LISTA DE USUARIOS
    this.itemService.getItems().subscribe(res =>{
      this.itemService.itemArray = res as Item[];
    })
  }


  getTransactions(){//OBTENGO LA LISTA DE transactions
    this.transactionService.getTransactions().subscribe(res =>{
      this.transactionService.transactionArray = res as Transaction[];
    })
  }

  deleteBudget(budget_number:string,form: NgForm){
    if(confirm('¿Seguro que desea eliminar este presupuesto?')) {
      this.budgetService.deleteBudget(budget_number).subscribe(res => {
        M.toast({html: 'Presupuesto eliminado'});
        this.getBudgets();
        this.getItems();
          this.resetForm(form);
          this.redirect();
        });
    }
    this.ngOnInit();
    this.redirect();

  }

  deleteItem(item_number:string,form: NgForm){
    if(confirm('¿Seguro que desea eliminar este item?')) {
      this.itemService.deleteItem(item_number).subscribe(res => {
        M.toast({html: 'item eliminado'});
        this.getBudgets();
        this.getItems();
          this.resetForm(form);
          this.redirect();
        });
    }
    this.ngOnInit();
    this.redirect();
  }


  resetForm(form?:NgForm){//LIMPIA LOS CAMPOS
    if(form){
      form.reset();
      this.budgetService.selectedBudget = new Budget();  
      this.itemService.selectedItem = new Item(); 
      this.transactionService.selectedTransaction = new Transaction(); 
    }
  }

  redirect(){
    location.reload();
    this.calculateTotal(); 
  }

  calculatePlanned(){
    let cantidadItem=this.itemService.itemArray.length
    let totalPlaneado=0
    for(var i=0; i<cantidadItem;i++){
        totalPlaneado+=parseInt(this.itemService.itemArray[i].planned_balance)
      
    }
    document.getElementById('planeadoTotal').innerHTML = '$ '+totalPlaneado.toString();
    return totalPlaneado;
  }

  calculateSpent(){
    let cantidadItem=this.itemService.itemArray.length
    let totalGastado=0
    for(var i=0; i<cantidadItem;i++){
      console.log(this.itemService.itemArray[i].budget_number);
      if(this.itemService.itemArray[i].budget_number!=null){
        totalGastado+=parseInt(this.itemService.itemArray[i].spent_balance)
      }  
    }
    document.getElementById('gastadoTotal').innerHTML = '$ '+totalGastado.toString();
    return totalGastado;
  }

  calculateTotal(){
    let spent=this.calculateSpent();
    let planned=this.calculatePlanned();
    let balance = planned-spent
    document.getElementById('balanceTotal').innerHTML = '$ '+balance.toString();
  }

  getNumberItem(item:Item){
    number_items = item.item_number;
    description = item.description;
  }

}

