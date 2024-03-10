import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  //properties 
validationErr = [];

  baseURL = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseURL + "error/not-found").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get400Error() {
    this.http.get(this.baseURL + "error/bad-request").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get500Error() {
    this.http.get(this.baseURL + "error/server-error").subscribe({
      next: res => console.log(res),
      error: err => {console.log(err)
      this.validationErr = err; // Multiple Error Messages 
      } 
    })
  }

  get401Error() {
    this.http.get(this.baseURL + "error/auth").subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get400ValidationError() {
    this.http.get(this.baseURL + "account/register", {}).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
}
