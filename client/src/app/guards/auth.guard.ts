import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private _accountService: AccountService, private toast: ToastrService){}

  canActivate(): Observable<boolean>  {
    return this._accountService.currentUser$.pipe(
      map(user=> {
        if (user) return true
        else {
          this.toast.error('You shall not pass!');
          return false
        }
      })
    )
  }
  
}
