import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-system-positions',
  templateUrl: './positions.component.html',
  styles: [
    `
      .ant-advanced-search-form {
        padding: 12px 12px 0px 12px;
        /*background: #fbfbfb;*/
        /*border: 1px solid #d9d9d9;*/
        border-radius: 6px;
      }

      .search-result-list {
        margin-top: 0px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        /*background-color: #fafafa;*/
        text-align: center;
        padding-top: 0px;
      }

      [nz-form-label] {
        overflow: visible;
      }

      button {
        margin-left: 8px;
      }

      .collapse {
        margin-left: 8px;
        font-size: 12px;
      }

      .search-area {
        text-align: right;
      }
    `
  ]
})
export class SystemPositionsComponent implements OnInit {

  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) { }

  // 初始化方法
  ngOnInit(): void { }



}
