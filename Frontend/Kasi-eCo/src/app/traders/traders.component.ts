import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../services/trader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {
  traders: Trader[] = [];
  filteredTraders: Trader[] = [];
  searchTerm = '';

  constructor(private traderService: TraderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getTraders();
  }

  getTraders(): void {
    this.traderService.getTraders().subscribe((traders: Trader[]) => {
      this.traders = traders;
      this.filteredTraders = traders; // Initialize filteredTraders with all traders
    });
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredTraders = this.traders.filter((trader: Trader) => {
        const searchTerm = this.searchTerm.toLowerCase();
        const businessName = trader.businessName.toLowerCase();
        return businessName.includes(searchTerm);
      });
    } else {
      this.filteredTraders = this.traders; // Reset filteredTraders to all traders
    }
  }

  add(trader_name: string, businessName: string, email: string): void {
    const traderData: Trader = {
      trader_name: trader_name,
      businessName: businessName,
      email: email,
      id: 0,
      address: '',
      cell: '',
      image: ''
    };
  
    trader_name = trader_name.trim();
    if (!trader_name) {
      return;
    }
    this.traderService.addTrader(traderData).subscribe((trader: Trader) => {
      this.traders.push(trader);
      console.log(trader);
    });
  }
  

  delete(trader: Trader): void {
    this.traderService.deleteTrader(trader.id).subscribe(() => {
      this.traders = this.traders.filter((h: Trader) => h !== trader);
      console.log(`Deleted trader with ID: ${trader.id}`);
    });
  }
}


//   delete(_id:number ): void {
//     const id = this.route.snapshot.paramMap.get('id')
//     this.traderService.deleteTrader(id).subscribe(trader => {
//       console.log(trader);
//   });
//  }
