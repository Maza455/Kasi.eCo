import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product: any;

  constructor( 
    private productService: ProductService,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.getOne()
  }

  getOne(){
    let id = this.route.snapshot.paramMap.get("id");
    this.productService.getOneProduct(id).subscribe({
      next: data => {
        this.product = data
        console.log(this.product)
      },
      error: err => {
        console.log(err.message)
      }
    });
   }
}
