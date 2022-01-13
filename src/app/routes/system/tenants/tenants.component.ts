import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PositionsCreateParam } from '../positions/entity/positions.create.param';
import { PositionsInfoVo } from '../positions/entity/positions.info.vo';
import { PositionsQueryParam } from '../positions/entity/positions.query.param';
import { UserInfoVo } from '../users/entity/user.info.vo';
import { TenantInfo } from './entity/tenant.info';
import { TenantInfoCreateParam } from './entity/tenant.info.create.param';
import { TenantInfoQueryParam } from './entity/tenant.info.query.param';
import { TenantInfoUpdateParam } from './entity/tenant.info.update.param';

@Component({
  selector: 'app-system-tenants',
  templateUrl: './tenants.component.html',
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
export class SystemTenantsComponent implements OnInit {
  /////////// URLS
  TENANT_QUERY: string = '/user-center-server/sys_tenant/query';
  TENANT_CREATE: string = '/user-center-server/sys_tenant/create';
  TENANT_UPDATE: string = '/user-center-server/sys_tenant/update';
  TENANT_DELETE: string = '/user-center-server/sys_tenant/delete/';
  TENANT_ADMIN_MGR_GET: string = '/user-center-server/sys_tenant/get_mgr_user/';
  TENANT_ADMIN_MGR_UPDATE: string = '/user-center-server/sys_tenant/mgr_user/update';
  TENANT_ADMIN_MGR_CHANGE_PWD: string = '/user-center-server/sys_tenant/mgr_user/reset_pwd';

  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {}

  ngOnInit(): void {
    // 查询数据表
    this.searchList();
  }

  /////////////////////////// 查询岗位数据
  selectTenantInfo: TenantInfo | null = null; // 当前选中的岗位信息
  tenantInfoList: TenantInfo[] = []; // 岗位列表
  tenantInfoTotal = 0; // 总数
  tenantInfoPageNum = 1; // 页码
  tenantInfoPageSize = 15; // 每页条数
  tenantQueryParam: TenantInfoQueryParam = new TenantInfoQueryParam(); // 查询条件

  // 重置查询条件
  resetQuery() {
    this.tenantQueryParam = new TenantInfoQueryParam();
  }

  // 查询岗位数据
  searchList() {
    this.http.post(this.TENANT_QUERY, this.tenantQueryParam).subscribe(res => {
      this.tenantInfoList = res.data.list;
      this.tenantInfoPageSize = res.data.pageSize;
      this.tenantInfoPageNum = res.data.pageNum;
      this.tenantInfoTotal = res.data.total;
      this.tenantInfoList.forEach(ele => {
        ele.selected = false;
      });
    });
    this.selectTenantInfo = null;
  }

  // 修改页码
  tenantInfoListPageIndexChange($event: number) {
    this.tenantQueryParam.pageNum = $event;
    this.searchList();
  }

  // 修改每页条数
  tenantInfoListPageSizeChange($event: number) {
    this.tenantQueryParam.pageSize = $event;
    this.searchList();
  }

  // 选择某一行数据
  onSelectTenantInfoRow(id: any, selected: boolean) {
    // 去掉当前选择的组织
    this.selectTenantInfo = null;
    this.tenantInfoList.forEach(ele => {
      if (selected == true) {
        if (ele.id == id) {
          ele.selected = true;
          this.selectTenantInfo = ele;
        } else {
          ele.selected = false;
        }
      } else {
        ele.selected = false;
      }
    });
  }

  /////////////////////////// 创建租户数据
  tenantSaveParam: TenantInfoCreateParam | null = null; // 保存租户参数
  tenantSaveModalShowFlag = false; // 是否显示创建模态框
  tenantSaveLoading = false; // 是否正在保存信息

  tenantSaveShowModal(): void {
    if (this.tenantSaveParam == null) {
      this.tenantSaveParam = new TenantInfoCreateParam();
      this.tenantSaveParam.activeFlag = false;
    }
    this.tenantSaveModalShowFlag = true;
  }

  // 执行保存方法
  tenantSaveHandleSave(): void {
    this.tenantSaveLoading = true;
    this.http.post(this.TENANT_CREATE, this.tenantSaveParam).subscribe(
      res => {
        this.notificationService.success('系统提示', res.msg);
        this.searchList();
        this.tenantSaveParam = null;
      },
      error => {},
      () => {
        this.tenantSaveLoading = false;
        this.tenantSaveModalShowFlag = false;
      }
    );
  }

  // 取消保存框
  tenantSaveHandleCancel(): void {
    // 取消视图显示
    this.tenantSaveModalShowFlag = false;
  }

  /////////////////////////// 删除租户数据
  confirmTenantDel() {
    if (this.selectTenantInfo == null) {
      this.notificationService.error('系统提示', '请选择租户进行操作');
      return;
    }
    this.http.delete(this.TENANT_DELETE + this.selectTenantInfo.id).subscribe(res => {
      this.notificationService.success('系统提示', res.msg);
      this.searchList();
      this.selectTenantInfo = null;
    });
  }

  /////////////////////////// 创建租户数据
  tenantUpdateParam: TenantInfoUpdateParam | null = null; // 保存租户参数
  tenantUpdateModalShowFlag = false; // 是否显示创建模态框
  tenantUpdateLoading = false; // 是否正在保存信息

  tenantUpdateShowModal(): void {
    if (this.selectTenantInfo == null) {
      this.notificationService.error('系统提示', '请选择一个信息操作');
      return;
    }
    this.tenantUpdateParam = JSON.parse(JSON.stringify(this.selectTenantInfo));
    this.tenantUpdateModalShowFlag = true;
  }

  // 执行保存方法
  tenantUpdateHandle(): void {
    this.tenantUpdateLoading = true;
    this.http.post(this.TENANT_UPDATE, this.tenantUpdateParam).subscribe(
      res => {
        this.notificationService.success('系统提示', res.msg);
        this.searchList();
        this.tenantUpdateParam = null;
      },
      error => {},
      () => {
        this.tenantUpdateLoading = false;
        this.tenantUpdateModalShowFlag = false;
      }
    );
  }

  // 取消保存框
  tenantUpdateHandleCancel(): void {
    // 取消视图显示
    this.tenantUpdateModalShowFlag = false;
  }

  /////////////////////////// 获取租户管理员
  mgrUser: UserInfoVo | null = null;
  tenantMgrShowModalShowFlag = false; // 是否显示创建模态框

  getTenantMgrUserShowModal(): void {
    if (this.selectTenantInfo == null) {
      this.notificationService.error('系统提示', '请选择一个信息操作');
      return;
    }

    this.http.get(this.TENANT_ADMIN_MGR_GET + this.selectTenantInfo.id).subscribe(res => {
      this.mgrUser = res.data;
      this.tenantMgrShowModalShowFlag = true;
    });
  }

  tenantMgrInfoHandleCancel(): void {
    // 取消视图显示
    this.tenantMgrShowModalShowFlag = false;
    this.mgrUser = null;
  }

  resetPwd(): void {
    if (this.mgrUser == null) {
      this.notificationService.error('系统提示', '未获取到当前用户信息');
      return;
    }
    this.http.post(this.TENANT_ADMIN_MGR_CHANGE_PWD, { userId: this.mgrUser.userId }).subscribe(res => {
      this.notificationService.success('系统提示', res.msg);
    });
  }

  // 执行保存方法
  tenantMgrUserUpdateHandle(): void {
    if (this.mgrUser == null) {
      this.notificationService.error('系统提示', '为获取到租户管理员信息');
      return;
    }

    this.http.post(this.TENANT_ADMIN_MGR_UPDATE, this.mgrUser).subscribe(
      res => {
        this.notificationService.success('系统提示', res.msg);
      },
      error => {},
      () => {
        this.tenantMgrInfoHandleCancel();
      }
    );
  }
}
