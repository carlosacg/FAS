import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  readonly URL_API="http://localhost:3000/api/budgets";
  selectedBudget : Budget;
  budgetArray : Budget[];

  constructor(private http: HttpClient) {
    this.selectedBudget = new Budget();
   }

  getBudgets(){//LEER
    return this.http.get(this.URL_API);     
  }

  postBudget(budget:Budget){//CREAR
    return this.http.post(this.URL_API,budget);
  }

  putBudget(budget:Budget){//ACTUALIZAR
    return this.http.put(this.URL_API +"/"+ budget.budget_number,budget);
  }

  deleteBudget(budget_number:string){//ELIMINAR
    return this.http.delete(this.URL_API +"/" +budget_number);
  }

}