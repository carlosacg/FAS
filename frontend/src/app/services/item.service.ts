import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly URL_API="http://localhost:3000/api/items";
  selectedItem : Item;
  itemArray : Item[];

  constructor(private http: HttpClient) {
    this.selectedItem = new Item();
   }

  getItems(){//LEER
    return this.http.get(this.URL_API);     
  }

  postItem(item:Item){//CREAR
    return this.http.post(this.URL_API,item);
  }

  putItem(item:Item){//ACTUALIZAR
    return this.http.put(this.URL_API +"/"+ item.item_number,item);
  }

  deleteItem(item_number:string){//ELIMINAR
    return this.http.delete(this.URL_API +"/" +item_number);
  }

}
