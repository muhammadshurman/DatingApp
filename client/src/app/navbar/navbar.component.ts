import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // properties 
  model: any = {};
  


  constructor(public _accountService: AccountService) { }

  ngOnInit(): void {
    
  }


  login() {
    this._accountService.login(this.model).subscribe({
      next: Response => {
        console.log(Response);
      },
      error: err => console.log(err)
    })
  }

  logout() {
    this._accountService.logout();
  }
}
