import { Component, OnInit } from '@angular/core';
import { TraderService } from '../services/trader.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUser: any;
  
  constructor(private token: TokenStorageService) { }
  ngOnInit(): void {
    if(!window.sessionStorage.getItem('auth-token')) {
      // alert("Please sign in or Login or Register")
      return window.location.replace('/home');
    }
    this.currentUser = this.token.getUser();

  }

  logout(): void {
    this.token.signOut();
    window.location.replace('/home')
    
  }


  // trader: any
  // constructor( 
  //   private traderService: TraderService,
  //   private route: ActivatedRoute
  //   ){}

  // ngOnInit(){
  //   this.getOne()
  // }

  // getOne(){
  //   let id = this.route.snapshot.paramMap.get("id");
  //   this.traderService.getTrader(id).subscribe({
  //     next: data => {
  //       this.trader = data
  //       console.log(this.trader)
  //     },
  //     error: err => {
  //       console.log(err.message)
  //     }
  //   })
  // }
}



