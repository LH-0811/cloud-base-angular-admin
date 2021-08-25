import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-resources',
  templateUrl: './resources.component.html',
})
export class SystemResourcesComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
