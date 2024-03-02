import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './services/account.service';
import { User } from './_models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Properties
  title = 'Hello';
  users: any;

  /* Dependency Injection (Inject HttpClient) to let the user hit the HTTP request */
  constructor( private _accountService: AccountService) { }


  // Methods
  ngOnInit(): void {
   this.setCurrentUser();
  }

  setCurrentUser (){
    const user = localStorage.getItem('user');
    if (!user) return;
    const User: User = JSON.parse(user);
    this._accountService.setCurrentUser(User);
  }

  
}
