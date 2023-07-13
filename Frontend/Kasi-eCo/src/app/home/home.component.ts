import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../services/trader.service';
// import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [
  //   { provide: CarouselConfig, useValue: { interval: 2000, noPause: true, showIndicators: true } }
  // ]
})
export class HomeComponent implements OnInit {
  traders: Trader[] = [];

  constructor(private traderService: TraderService) {}

  ngOnInit(): void {
    this.getTraders();
  }

  getTraders(): void {
    this.traderService.getTraders().subscribe((traders: Trader[]) => {
      this.traders = traders.slice(0, 4); // Display only the first 4 traders
    });
  }

  addToCart(trader: Trader): void {
    // Implement the logic to add the trader's products to the cart
    console.log('Adding trader to cart:', trader);
  }
}
