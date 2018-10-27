import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { ItemService } from '../../services/item.service';
import { NgForm } from '@angular/forms';
import { Budget } from '../../models/budget';
import { Item } from '../../models/item';

declare var M: any;


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  providers :[BudgetService,ItemService]

})
export class BudgetComponent implements OnInit {

  constructor(private budgetService: BudgetService,private itemService: ItemService) { }

  ngOnInit() {
    this.getBudgets();
    this.getItems();
  }

  addBudget(form?:NgForm){//AGREGAR CUENTA
      console.log(form.value);
      this.budgetService.postBudget(form.value).subscribe(res =>{
        this.resetForm(form);
        M.toast({html: 'Presupuesto Creada satisfactoriamente'});
        this.getBudgets();
        this.getItems();
      })
  }

  addItem(form?:NgForm){//AGREGAR CUENTA
    console.log(form.value);
    this.itemService.postItem(form.value).subscribe(res =>{
      //this.resetForm(form);
      M.toast({html: 'Item Creada satisfactoriamente'});
      //this.getBudgets();
      //this.getItems();
    })
}


  getBudgets(){//OBTENGO LA LISTA DE USUARIOS
    this.budgetService.getBudgets().subscribe(res =>{
      this.budgetService.budgetArray = res as Budget[];
    })
  }

  


  getItems(){//OBTENGO LA LISTA DE USUARIOS
    this.itemService.getItems().subscribe(res =>{
      this.itemService.itemArray = res as Item[];
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


  insertTransaction(item:Item, form:NgForm){
     
  }

  resetForm(form?:NgForm){//LIMPIA LOS CAMPOS
    if(form){
      form.reset();
      this.budgetService.selectedBudget = new Budget();  
      this.itemService.selectedItem = new Item();    
    }
  }

  redirect(){
    location.reload(); 
  }

  calculatePlanned(budget_number){
    let cantidadItem=this.itemService.itemArray.length
    let totalPlaneado=0
    for(var i=0; i<cantidadItem;i++){
      if(this.itemService.itemArray[i].budget_number == budget_number){
        totalPlaneado+=parseInt(this.itemService.itemArray[i].planned_balance)
      }
    }
    alert(totalPlaneado);
    document.getElementById('planeadoTotal').innerHTML = '$ '+totalPlaneado.toString();
  }

  calculateSpent(budget_number){
    let cantidadItem=this.itemService.itemArray.length
    let totalGastado=0
    for(var i=0; i<cantidadItem;i++){
      if(this.itemService.itemArray[i].budget_number == budget_number){
        totalGastado+=parseInt(this.itemService.itemArray[i].spent_balance)
      }
    }
    alert(totalGastado);
    document.getElementById('gastadoTotal').innerHTML = '$ '+totalGastado.toString();
  }

  calculateTotal(budget_number){
    this.calculateSpent(budget_number);
    this.calculatePlanned(budget_number);
  }

}
