import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-depts',
  templateUrl: './depts.component.html',
})
export class SystemDeptsComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
