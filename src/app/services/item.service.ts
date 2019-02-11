import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly URL_API = "http://localhost:3000/api/items";
  selectedItem: Item;
  itemArray: Item[];

  constructor(private http: HttpClient) {
    this.selectedItem = new Item();
  }

  getItems(id: string) {//LEER
    return this.http.get(this.URL_API);
    //return this.http.get(this.URL_API + "/" + id);
  }

  postItem(item: Item) {//CREAR
    item.spent_balance = '0';
    let subcadena = item.budget_number.substr(1, 1);

    if (item.budget_number.substr(1, 2) == ' ') {
      subcadena = item.budget_number.substr(1, 1);
    }
    if (item.budget_number.substr(1, 3) == ' ') {
      subcadena = item.budget_number.substr(1, 2);
    }
    if (item.budget_number.substr(1, 4) == ' ') {
      subcadena = item.budget_number.substr(1, 3);
    }
    item.budget_number = subcadena;
    return this.http.post(this.URL_API, item);
  }

  putItem(item: Item) {//ACTUALIZAR
    return this.http.put(this.URL_API + "/" + item.item_number, item);
  }

  deleteItem(item_number: string) {//ELIMINAR
    return this.http.delete(this.URL_API + "/" + item_number);
  }

}
