import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-roles',
  templateUrl: './roles.component.html',
})
export class SystemRolesComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
