import {Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";


import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import {UserQueryParam} from "./entity/user.query.param";


@Component({
  selector: 'app-system-users',
  templateUrl: './users.component.html',
  styles: [
    `
      .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
      }

      .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
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
export class SystemUsersComponent implements OnInit {

  // 构造方法 注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {
  }

  // 页面初始化
  ngOnInit(): void {
    // 获取部门树
    this.deptSearchParamChange();

  }

  // 获取部门树
  deptSearchParam = null;
  deptTree: [] = [];
  // 部门名称查询输入框发生输入变化时触发部门树查询
  deptSearchParamChange() {
    let reqUrl = "/user-center-server/sys_dept/tree/query";
    if (this.deptSearchParam != null && this.deptSearchParam != '') {
      reqUrl = `${reqUrl}?deptName=${this.deptSearchParam}`;
    }
    this.http.get(reqUrl).subscribe(
      res => {
        this.deptTree = res.data;
      },
      error => {
      },
      () => {
        console.log('deptTree:'+this.deptTree);
      })
  }
  deptTreeClick($event: any) {
    console.log("event:",$event)
  }

  // 查询用户数据
  userQueryParam:UserQueryParam = new UserQueryParam();

  // 查询用户数据
  searchUserList() {
    console.log(this.userQueryParam)
  }

  // 重置查询条件
  resetQuery() {
    this.userQueryParam = new UserQueryParam();
  }

  userQueryParamChangeDate() {
    if (this.userQueryParam.queryDate.length == 2){
      this.userQueryParam.createTimeLow = this.userQueryParam.queryDate[0];
      this.userQueryParam.createTimeUp = this.userQueryParam.queryDate[1];
    }
  }
}
