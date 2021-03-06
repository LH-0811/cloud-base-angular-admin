import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { UserInfoVo } from '../users/entity/user.info.vo';
import { UserQueryParam } from '../users/entity/user.query.param';
import { UserSaveParam } from '../users/entity/user.save.param';
import { RoleInfoVo } from './entity/role.info.vo';
import { RoleQueryParam } from './entity/role.query.param';
import { RoleSaveParam } from './entity/role.save.param';

@Component({
  selector: 'app-system-roles',
  templateUrl: './roles.component.html',
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
export class SystemRolesComponent implements OnInit {
  /////////// URLS
  ROLE_QUERY: string = '/user-center-server/sys_role/query';
  ROLE_CREATE: string = '/user-center-server/sys_role/create';
  ROLE_UPDATE: string = '/user-center-server/sys_role/update';
  ROLE_DELETE: string = '/user-center-server/sys_role/delete/';
  RES_TREE: string = '/user-center-server/sys_res/tree';

  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {}

  // 初始化方法
  ngOnInit(): void {
    // 获取角色数据列表
    this.searchRoleList();

    // 获取全部的资源树
    this.getAllResTree();
  }

  /////////////////////////// 公共数据
  allResTree = []; // 全部的资源树数据
  getAllResTree() {
    console.log(this.roleQueryParam);
    this.http.get(this.RES_TREE, this.roleQueryParam).subscribe(res => {
      this.allResTree = res.data;
    });
  }

  allResTreeClick($event: any) {
    console.log($event);
  }

  /////////////////////////// 查询角色数据
  selectRoleInfo: RoleInfoVo | null = null; // 当前选中的角色信息
  roleInfoList: RoleInfoVo[] = []; // 角色列表
  roleInfoTotal = 0; // 总数
  roleInfoPageNum = 1; // 页码
  roleInfoPageSize = 15; // 每页条数
  roleQueryParam: RoleQueryParam = new RoleQueryParam(); // 查询条件

  // 重置查询条件
  resetQuery() {
    this.roleQueryParam = new RoleQueryParam();
  }

  // 查询角色数据
  searchRoleList() {
    console.log(this.roleQueryParam);
    this.http.post(this.ROLE_QUERY, this.roleQueryParam).subscribe(res => {
      this.roleInfoList = res.data.list;
      this.roleInfoPageSize = res.data.pageSize;
      this.roleInfoPageNum = res.data.pageNum;
      this.roleInfoTotal = res.data.total;
      this.roleInfoList.forEach(ele => {
        ele.selected = false;
      });
    });
  }

  // 修改页码
  roleInfoListPageIndexChange($event: number) {
    this.roleQueryParam.pageNum = $event;
    this.searchRoleList();
  }

  // 修改每页条数
  roleInfoListPageSizeChange($event: number) {
    this.roleQueryParam.pageSize = $event;
    this.searchRoleList();
  }

  // 选择某一行数据
  onSelectRoleInfoRow(id: any, selected: boolean) {
    // 去掉当前选择的组织
    this.selectRoleInfo = null;
    this.roleInfoList.forEach(ele => {
      if (selected == true) {
        if (ele.id == id) {
          ele.selected = true;
          this.selectRoleInfo = ele;
        } else {
          ele.selected = false;
        }
      } else {
        ele.selected = false;
      }
    });
    console.log(this.selectRoleInfo);
  }

  /////////////////////////// 新增角色数据
  roleSaveParam: RoleSaveParam | null = null; // 保存用户参数
  roleSaveModalShowFlag = false; // 是否显示用户创建模态框
  roleSaveLoading = false; // 是否正在保存用户信息
  @ViewChild('roleSaveTree')
  roleSaveTree: any;
  // 显示模态框方法

  // 以创建用户的方式打开编辑用户信息模态框
  roleSaveShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.roleSaveParam == null || this.roleSaveParam.id != null || this.roleSaveParam.id != undefined) {
      this.roleSaveParam = new RoleSaveParam();
      this.roleSaveParam.sysResTree = JSON.parse(JSON.stringify(this.allResTree));
    }
    // 打开视图
    this.roleSaveModalShowFlag = true;
  }

  // 以修改用户的方式打开编辑用户信息模态框
  roleUpdateShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    this.roleSaveParam = JSON.parse(JSON.stringify(this.selectRoleInfo));
    if (this.roleSaveParam != null) {
      // 生成选择的级联部门列表
      this.roleSaveParam.sysResTree = JSON.parse(JSON.stringify(this.allResTree));
    }
    // 打开视图
    this.roleSaveModalShowFlag = true;

    // 设置被选中的列表
    setTimeout(() => {
      this.setCheckedNodeForUpdateRole();
    }, 300);
  }

  // 执行保存方法
  roleSaveHandleSave(): void {
    console.log(this.roleSaveTree);
    console.log(this.roleSaveTree.getCheckedNodeList());
    console.log(this.roleSaveTree.getHalfCheckedNodeList());

    let checkedResIdListWhenRoleSave = this.getCheckedResIdListWhenRoleSave();
    let resIdList = checkedResIdListWhenRoleSave.map(ele => ele['key']);
    console.log('resIdList', resIdList);
    this.roleSaveLoading = true;
    if (this.roleSaveParam == null) {
      this.notificationService.error('系统提示', '保存信息尚未初始化');
      return;
    }
    let saveUrl = this.ROLE_CREATE;
    if (this.roleSaveParam.id != null || this.roleSaveParam.id != undefined) {
      saveUrl = this.ROLE_UPDATE;
    }
    this.roleSaveParam.resIdList = resIdList;
    this.http.post(saveUrl, this.roleSaveParam).subscribe(
      res => {
        this.notificationService.success('系统提示', res.msg);
        this.roleSaveParam = null;
        this.selectRoleInfo = null;
        this.searchRoleList();
      },
      error => {},
      () => {
        this.roleSaveLoading = false;
        this.roleSaveModalShowFlag = false;
      }
    );
  }

  // 取消保存框
  roleSaveHandleCancel(): void {
    // 取消视图显示
    this.roleSaveModalShowFlag = false;
  }

  // 获取到创建角色时所有被选中的资源id
  getCheckedResIdListWhenRoleSave(): [] {
    // 全部应该被获取到的节点列表
    let allCheckNode: never[] = [];
    // 被全选的资源节点
    let checkedNodeList = this.roleSaveTree.getCheckedNodeList();
    // 被半选的资源节点
    let halfCheckedNodeList = this.roleSaveTree.getHalfCheckedNodeList();
    allCheckNode = allCheckNode.concat(checkedNodeList, halfCheckedNodeList);

    let resultList = this.getCheckOrHalfChekNodeList(allCheckNode, []);
    console.log(resultList);
    return resultList;
  }

  getCheckOrHalfChekNodeList(nodeList: any, resultList: any): [] {
    for (let node of nodeList) {
      if (node['isChecked'] || node['isHalfChecked']) {
        var resIdList = resultList.map((ele: any) => {
          return ele['key'];
        });
        if (resIdList.indexOf(node['key']) == -1) {
          resultList.push(node);
        }
      }
      if (!node['isLeaf']) {
        this.getCheckOrHalfChekNodeList(node['children'], resultList);
      }
    }
    return resultList;
  }

  setCheckedNodeForUpdateRole() {
    if (this.roleSaveParam == null || this.roleSaveParam.sysResList == null || this.roleSaveParam.sysResList.length == 0) {
      return;
    }
    var allNodes = this.roleSaveTree.getTreeNodes();
    console.log('allNodes:', allNodes);
    console.log('this.roleSaveParam.sysResList', this.roleSaveParam.sysResList);
    let checkIdList: [] = [];
    for (let element of this.roleSaveParam.sysResList) {
      // @ts-ignore
      checkIdList.push(element.id);
    }
    console.log('this.roleSaveParam.sysResIdList', checkIdList);
    this.setChecked(checkIdList, allNodes);
  }

  setChecked(checkedKeys: [], nodeList: any[]) {
    for (var node of nodeList) {
      // @ts-ignore
      if (node['isLeaf'] && checkedKeys.indexOf(node['key']) > -1) {
        // node['isChecked'] = true;
        node.setSyncChecked(true);
      }
      if (!node['isLeaf']) {
        this.setChecked(checkedKeys, node['children']);
      }
    }
  }

  /////////////////////////// 删除角色数据
  confirmRoleDel() {
    if (this.selectRoleInfo == null) {
      this.notificationService.error('系统提示', '请选择角色进行操作!');
      return;
    }
    this.http.delete(this.ROLE_DELETE + this.selectRoleInfo.id).subscribe(res => {
      this.notificationService.success('系统提示', res.msg);
      this.searchRoleList();
      this.selectRoleInfo = null;
    });
  }
}
