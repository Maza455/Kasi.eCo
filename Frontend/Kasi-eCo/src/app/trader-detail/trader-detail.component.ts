import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraderService } from '../services/trader.service';

@Component({
  selector: 'app-trader-detail',
  templateUrl: './trader-detail.component.html',
  styleUrls: ['./trader-detail.component.css']
})
export class TraderDetailComponent implements OnInit {
  trader: any;

  constructor(
    private route: ActivatedRoute,
    private traderService: TraderService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    let id = this.route.snapshot.paramMap.get("id")
    console.log(id)
    this.traderService.getAll(id).subscribe({
      next: (data: any) => {
        this.trader = data
        console.log(this.trader)
      }
    })
  }
}