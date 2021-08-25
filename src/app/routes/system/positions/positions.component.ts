import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-positions',
  templateUrl: './positions.component.html',
})
export class SystemPositionsComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
