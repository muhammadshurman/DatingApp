import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStateErr = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStateErr.push(err.error.errors[key])
                  }
                }
                throw modelStateErr;
              } else {
                this.toastr.error(err.error, err.status.toString());
              }
              break;
            case 401:
              this.toastr.error("Unauthorized", err.status.toString())
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { err: err.error } }
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default: this.toastr.error("Something unexpected went wrong :(");
              console.log(err);
              break;
          }
        }
        throw err;
      })
    )
  }
}
