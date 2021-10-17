import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-monitor-zipkin',
  templateUrl: './zipkin.component.html',
})
export class MonitorZipkinComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
