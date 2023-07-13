import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_api = "http://localhost:5555/v1/products/"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    return this.http.get<any[]>(base_api);
  }

  getOneProduct(id: any){
    return this.http.get(base_api+id)
  }
}
