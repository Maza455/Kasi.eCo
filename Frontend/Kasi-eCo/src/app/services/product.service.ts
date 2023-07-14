import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const base_api = 'https://kasi-e-co.vercel.app/v1/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(base_api).pipe(
      catchError((error: any) => {
        // Handle the error here (e.g., logging, showing a friendly error message)
        throw error;
      })
    );
  }

  getOneProduct(id: any): Observable<Product> {
    const url = `${base_api}${id}`;
    return this.http.get<Product>(url).pipe(
      catchError((error: any) => {
        // Handle the error here (e.g., logging, showing a friendly error message)
        throw error;
      })
    );
  }
}

export interface Product {
  // Define the properties of a product here
}