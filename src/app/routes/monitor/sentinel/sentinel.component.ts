import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-monitor-sentinel',
  templateUrl: './sentinel.component.html',
})
export class MonitorSentinelComponent implements OnInit {

  constructor(private http: _HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  webUrl = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:9000/");
}
