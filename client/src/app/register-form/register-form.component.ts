import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancleRegister = new EventEmitter()

  //properties
  model:any = {};
  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this._accountService.register(this.model).subscribe({
      next: () =>{
        this.cancel();
      },
      error: err => console.log(err)
    })
  }

  cancel(){
    this.cancleRegister.emit(false)
  }
}
