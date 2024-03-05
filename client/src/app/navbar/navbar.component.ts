import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // properties 
  model: any = {};



  constructor(public _accountService: AccountService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {

  }


  login() {
    this._accountService.login(this.model).subscribe({
      next: _ =>
      this.router.navigateByUrl("/members"),
      error: err => this.toast.error(err.error)
    })
  }

  logout() {
    this._accountService.logout();
    this.router.navigateByUrl("/");
  }
}
