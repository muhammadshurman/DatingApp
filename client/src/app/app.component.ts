import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { myURL } from './constant/url';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Requst has completed')
    })
  }

}
