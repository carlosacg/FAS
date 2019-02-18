import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly URL_API = "https://backend-fas-uv.herokuapp.com/api/items";
  selectedItem: Item;
  itemArray: Item[];

  constructor(private http: HttpClient) {
    this.selectedItem = new Item();
  }

  getItems(id: string) {//LEER
    return this.http.get(this.URL_API + "/" + sessionStorage.getItem("id"));
  }

  postItem(item: Item) {//CREAR
    item.spent_balance = '0';
    let subcadena;

    if (item.budget_number.substr(2, 1) == ' ') {
      subcadena = item.budget_number.substr(1, 1);//UN DIGITO
    }
    if (item.budget_number.substr(3, 1) == ' ') {
      subcadena = item.budget_number.substr(1, 2);//DOS DIGITOS
    }
    if (item.budget_number.substr(4, 1) == ' ') {
      subcadena = item.budget_number.substr(1, 3);//TRES DIGITOS
    }
    if (item.budget_number.substr(5, 1) == ' ') {
      subcadena = item.budget_number.substr(1, 4);//CUATRO DIGITOS
    }
    item.budget_number = subcadena;
    console.log(item);
    return this.http.post(this.URL_API, item);
  }

  putItem(item: Item) {//ACTUALIZAR
    return this.http.put(this.URL_API + "/" + item.item_number, item);
  }

  deleteItem(item_number: string) {//ELIMINAR
    return this.http.delete(this.URL_API + "/" + item_number);
  }

}
