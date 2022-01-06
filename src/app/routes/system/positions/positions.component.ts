import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DeptCreateParam } from '../depts/entity/dept.create.param';
import { RoleInfoVo } from '../roles/entity/role.info.vo';
import { RoleQueryParam } from '../roles/entity/role.query.param';
import { PositionsCreateParam } from './entity/positions.create.param';
import { PositionsInfoVo } from './entity/positions.info.vo';
import { PositionsQueryParam } from './entity/positions.query.param';

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
  //////////////////////////////// URLS
  POSITIONS_QUERY = '/user-center-server/sys_positions/query';
  POSITIONS_CREATE = '/user-center-server/sys_positions/create';
  POSITIONS_DELETE = '/user-center-server/sys_positions/delete/';
  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {}

  // 初始化方法
  ngOnInit(): void {
    // 查询岗位列表
    this.searchPositionsList();
  }

  /////////////////////////// 查询岗位数据
  selectPositionsInfo: PositionsInfoVo | null = null; // 当前选中的岗位信息
  positionsInfoList: PositionsInfoVo[] = []; // 岗位列表
  positionsInfoTotal = 0; // 总数
  positionsInfoPageNum = 1; // 页码
  positionsInfoPageSize = 15; // 每页条数
  positionsQueryParam: PositionsQueryParam = new PositionsQueryParam(); // 查询条件

  // 重置查询条件
  resetQuery() {
    this.positionsQueryParam = new PositionsQueryParam();
  }

  // 查询岗位数据
  searchPositionsList() {
    this.http.post(this.POSITIONS_QUERY, this.positionsQueryParam).subscribe(res => {
      this.positionsInfoList = res.data.list;
      this.positionsInfoPageSize = res.data.pageSize;
      this.positionsInfoPageNum = res.data.pageNum;
      this.positionsInfoTotal = res.data.total;
      this.positionsInfoList.forEach(ele => {
        ele.selected = false;
      });
    });
  }

  // 修改页码
  positionsInfoListPageIndexChange($event: number) {
    this.positionsQueryParam.pageNum = $event;
    this.searchPositionsList();
  }

  // 修改每页条数
  positionsInfoListPageSizeChange($event: number) {
    this.positionsQueryParam.pageSize = $event;
    this.searchPositionsList();
  }

  // 选择某一行数据
  onSelectPositionsInfoRow(id: any, selected: boolean) {
    // 去掉当前选择的组织
    this.selectPositionsInfo = null;
    this.positionsInfoList.forEach(ele => {
      if (selected == true) {
        if (ele.id == id) {
          ele.selected = true;
          this.selectPositionsInfo = ele;
        } else {
          ele.selected = false;
        }
      } else {
        ele.selected = false;
      }
    });
    console.log(this.selectPositionsInfo);
  }

  /////////////////////////// 创建岗位数据
  positionsSaveParam: PositionsCreateParam | null = null; // 保存岗位参数
  positionsSaveModalShowFlag = false; // 是否显示创建模态框
  positionsSaveLoading = false; // 是否正在保存信息

  // 以创建用户的方式打开编辑用户信息模态框
  positionsSaveShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.positionsSaveParam == null) {
      this.positionsSaveParam = new PositionsCreateParam();
    }
    // 打开视图
    this.positionsSaveModalShowFlag = true;
  }

  // 执行保存方法
  positionsSaveHandleSave(): void {
    this.positionsSaveLoading = true;
    this.http.post(this.POSITIONS_CREATE, this.positionsSaveParam).subscribe(
      res => {
        this.notificationService.success('系统提示', res.msg);
        this.searchPositionsList();
        this.positionsSaveParam = null;
      },
      error => {},
      () => {
        this.positionsSaveLoading = false;
        this.positionsSaveModalShowFlag = false;
      }
    );
  }

  // 取消保存框
  positionsSaveHandleCancel(): void {
    // 取消视图显示
    this.positionsSaveModalShowFlag = false;
  }

  /////////////////////////// 删除岗位数据
  confirmPositionsDel() {
    if (this.selectPositionsInfo == null) {
      this.notificationService.error('系统提示', '请选择岗位进行操作');
      return;
    }
    this.http.delete(this.POSITIONS_DELETE + this.selectPositionsInfo.id).subscribe(res => {
      this.notificationService.success('系统提示', '删除成功');
      this.searchPositionsList();
      this.selectPositionsInfo = null;
    });
  }
}
