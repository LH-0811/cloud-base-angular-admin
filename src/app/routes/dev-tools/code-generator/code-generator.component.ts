import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DataTable } from './entity/data.table';
import { DatabaseInfo } from './entity/database.info';

@Component({
  selector: 'app-dev-tools-code-generator',
  templateUrl: './code-generator.component.html'
})
export class DevToolsCodeGeneratorComponent implements OnInit {
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {}

  ngOnInit(): void {
    // 查询数据表
    this.searchDataTableList();
    this.getDbInfo();
  }

  ////////// 数据表列表///////////////////
  dataTableList: DataTable[] = []; // 数据表列表
  queryTableName: string | null = null;
  selectAllFlag = false;
  downloadData: any = null;
  genCodeLoading: boolean = false;

  // 重置查询条件
  resetQuery() {
    this.queryTableName = null;
  }

  // 查询数据表数据
  searchDataTableList() {
    console.log(`this.queryTableName:${this.queryTableName}`);
    this.http.post('/code-generator/list', { tableName: this.queryTableName }).subscribe(res => {
      console.log('res:', res.data);
      this.dataTableList = res.data;
      this.dataTableList.forEach(ele => {
        ele.selected = false;
      });
    });
  }

  // 点击选择全部
  clickAllTableSelect() {
    this.selectAllFlag = !this.selectAllFlag;
    this.dataTableList.forEach(ele => {
      ele.selected = this.selectAllFlag;
    });
    this.genCodeData();
  }

  // 生成代码
  genCodeData() {
    let selectTableList = this.dataTableList.filter(ele => ele.selected);
    if (selectTableList.length == 0) {
      this.downloadData = null;
    } else {
      var tableNameList = selectTableList.map(ele => ele.tableName);
      this.downloadData = { packagePath: this.databaseInfo.packageName, tableList: tableNameList };
    }
    console.log(this.downloadData);
  }

  downloadCode() {
    this.genCodeLoading = true;
    this.http
      .post(
        '/code-generator/code',
        this.downloadData,
        {},
        {
          observe: 'response',
          responseType: 'blob'
        }
      )
      .subscribe(
        response => {
          console.log(response);
          const link = document.createElement('a');
          const blob = new Blob([response.body], { type: 'application/zip' });
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'generator.zip');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {},
        () => {
          this.genCodeLoading = false;
        }
      );
  }

  /////// 修改数据源的弹框 /////////
  showDbInfoModalFlag = false; // 是否显示数据源弹框
  saveDaInfoModalLoading = false; // 是否正在保存中
  databaseInfo: DatabaseInfo = new DatabaseInfo(); // 数据库信息

  getDbInfo() {
    this.http.get('/code-generator/db_info/get').subscribe(res => {
      this.databaseInfo.dbUrl = res.data.url;
      this.databaseInfo.dbUsername = res.data.username;
      this.databaseInfo.dbPassword = res.data.password;
    });
  }

  showDbInfoModal(): void {
    this.showDbInfoModalFlag = true;
  }

  dbInfoModalOk(): void {
    this.saveDaInfoModalLoading = true;
    this.http
      .post('/code-generator/db_info/set', {
        url: this.databaseInfo.dbUrl,
        username: this.databaseInfo.dbUsername,
        password: this.databaseInfo.dbPassword
      })
      .subscribe(res => {
        this.notificationService.success('系统提示', res.msg);
        this.saveDaInfoModalLoading = false;
        this.showDbInfoModalFlag = false;
        this.searchDataTableList();
      });
  }

  dbInfoModalCancel(): void {
    this.showDbInfoModalFlag = false;
  }
}
