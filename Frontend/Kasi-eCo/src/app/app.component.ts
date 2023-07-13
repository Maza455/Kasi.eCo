import { Component } from '@angular/core';
import { TraderService } from './services/trader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  traders: any[] =[];

  constructor(private traderService: TraderService, private router: Router ) {}

  ngOnInit(): void {
    this.traderService.getTraders().subscribe(
      (data: any) => {
        this.traders = data;
      },
      (error: any) => {
        console.error('Error fetching traders', error);
      }
    );
  }

  navigateToTraderDetails(traderId: number): void {
    this.router.navigate(['/traders', traderId]);
  }
}
