import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-users',
  templateUrl: './users.component.html',
})
export class SystemUsersComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
