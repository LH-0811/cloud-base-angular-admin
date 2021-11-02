import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-monitor-zipkin',
  templateUrl: './zipkin.component.html',
})
export class MonitorZipkinComponent implements OnInit {

  constructor(private http: _HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  webUrl = this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:9411/");
}
