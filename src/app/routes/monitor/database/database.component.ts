import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AddressVo, DruidMonitorVo} from './entity/druid.monitor.vo';

@Component({
  selector: 'app-monitor-database',
  templateUrl: './database.component.html',
})
export class MonitorDatabaseComponent implements OnInit {

  // URLS
  DruidMonitor = "/user-center-server/monitor/druid";

  ///////////////// 构造方法注入
  constructor(private http: _HttpClient, private notificationService: NzNotificationService,private sanitizer: DomSanitizer) {
  }

  ///////////////// 初始化方法
  ngOnInit(): void {
    // 获取数据库监控信息
    this.getDruidMonitorVo();
  }

///////////////// 数据库监控数据
  // 数据库监控信息
  druidMonitorVoList: DruidMonitorVo[] = [];
  selectAddress: AddressVo | null = null;
  webUrl:any;
  // 获取数据库监控信息
  getDruidMonitorVo() {
    this.http.get(this.DruidMonitor).subscribe(
      res => {
        this.druidMonitorVoList = res.data.druidList;
        console.log("this.druidMonitorVo:", this.druidMonitorVoList)
      }
    )
  }

  addressChange(){
    if (this.selectAddress != null && this.selectAddress.druidUrl != null){
      this.webUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectAddress.druidUrl);
    }
  }

}
