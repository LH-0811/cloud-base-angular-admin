import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";


import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from 'ng-zorro-antd/tree';
import {UserQueryParam} from "./entity/user.query.param";
import {UserInfoVo} from "./entity/user.info.vo";
import {UserSaveParam} from "./entity/user.save.param";


@Component({
  selector: 'app-system-users',
  templateUrl: './users.component.html',
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
export class SystemUsersComponent implements OnInit {

  // URLS
  USER_CREATE:string = '/user-center-server/sys_user/create';
  USER_UPDATE:string = '/user-center-server/sys_user/update';
  USER_DELETE:string = '/user-center-server/sys_user/delete/';
  USER_RESET_PWD:string = '/user-center-server/sys_user/reset/pwd';
  DEPT_CASCADER_QUERY:string = '/user-center-server/sys_dept/cascader/query';
  POSITIONS_QUERY_ALL:string = '/user-center-server/sys_positions/query/all';
  ROLE_QUERY_ALL_LIST:string = '/user-center-server/sys_role/query/all_list';
  DEPT_TREE_QUERY:string = '/user-center-server/sys_dept/tree/query';
  USER_DEPT_QUERY:string = '/user-center-server/sys_user/dept/query';




  // 构造方法 注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {
  }

  // 页面初始化
  ngOnInit(): void {
    // 获取部门树
    this.searchDeptTree();

    // 获取用户列表
    this.searchUserList();

    // 获取部门级联数据
    this.getDeptCascader();

    // 获取岗位列表
    this.getPositionList();

    // 获取角色列表
    this.getRoleList();
  }

  //////////////////////// 公用数据
  deptCascader: [] = []; // 部门级联数据
  selectCascaderDept: [] = []; // 选择的部门数据

  positionList: [] = []; // 岗位数据

  roleList: [] = []; // 角色数据

  // 获取部门
  getDeptCascader() {
    this.http.get(this.DEPT_CASCADER_QUERY).subscribe(
      res => {
        this.deptCascader = res.data;
      },
      null,
      () => {
      })
  }

  // 获取岗位列表
  getPositionList() {

    this.http.get(this.POSITIONS_QUERY_ALL).subscribe(
      res => {
        this.positionList = res.data;
      },
      null,
      () => {
      })
  }

  // 获取角色列表
  getRoleList() {
    this.http.get(this.ROLE_QUERY_ALL_LIST).subscribe(
      res => {
        this.roleList = res.data;
      },
      null,
      () => {
      })
  }


  /////////////////////////// 获取部门树
  deptSearchParam = null;
  deptTree: [] = [];

  // 部门名称查询输入框发生输入变化时触发部门树查询
  searchDeptTree() {
    let reqUrl = this.DEPT_TREE_QUERY;
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
        console.log('deptTree:' + this.deptTree);
      })
  }

  // 点击部门树节点
  deptTreeClick($event: any) {
    console.log("event:", $event)
    if ($event.node.origin.selected) {
      this.userQueryParam.deptId = $event.node.origin.id;
    } else {
      this.userQueryParam.deptId = null;
    }
    this.searchUserList();
  }


  /////////////////////////// 查询用户数据
  selectUserInfo: UserInfoVo | null = null; // 当前选中的用户信息
  userInfoList: UserInfoVo[] = []; // 用户列表
  userInfoTotal = 0; // 总数
  userInfoPageNum = 1; // 页码
  userInfoPageSize = 15; // 每页条数
  userQueryParam: UserQueryParam = new UserQueryParam(); // 查询条件

  // 时间范围
  userQueryParamChangeDate() {
    if (this.userQueryParam.queryDate.length == 2) {
      this.userQueryParam.createTimeLow = this.userQueryParam.queryDate[0];
      this.userQueryParam.createTimeUp = this.userQueryParam.queryDate[1];
    }
  }

  // 重置查询条件
  resetQuery() {
    this.userQueryParam = new UserQueryParam();
  }

  // 查询用户数据
  searchUserList() {
    console.log(this.userQueryParam)
    this.http.post(this.USER_DEPT_QUERY, this.userQueryParam).subscribe(
      res => {
        this.userInfoList = res.data.list;
        this.userInfoPageSize = res.data.pageSize;
        this.userInfoPageNum = res.data.pageNum;
        this.userInfoTotal = res.data.total;
        this.userInfoList.forEach(ele => {
          ele.selected = false;
        });
      }
    );
  }

  // 修改页码
  userInfoListPageIndexChange($event: number) {
    this.userQueryParam.pageNum = $event;
    this.searchUserList();
  }

  // 修改每页条数
  userInfoListPageSizeChange($event: number) {
    this.userQueryParam.pageSize = $event;
    this.searchUserList();
  }

  // 选择某一行数据
  onSelectUserInfoRow(id: any, selected: boolean) {
    // 去掉当前选择的组织
    this.selectUserInfo = null;
    this.userInfoList.forEach(ele => {
      if (selected == true) {
        if (ele.userId == id) {
          ele.selected = true;
          this.selectUserInfo = ele;
        } else {
          ele.selected = false;
        }
      } else {
        ele.selected = false;
      }
    });
    console.log(this.selectUserInfo)
  }

  /////////////////////////// 新增用户数据
  userSaveParam: UserSaveParam | null = null; // 保存用户参数
  userSaveModalShowFlag = false; // 是否显示用户创建模态框
  userSaveLoading = false; // 是否正在保存用户信息
  // 显示模态框方法

  // 以创建用户的方式打开编辑用户信息模态框
  userCreateShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.userSaveParam == null || (this.userSaveParam.userId != null || this.userSaveParam.userId != undefined)) {
      this.userSaveParam = new UserSaveParam();
    }
    // 生成选择的级联部门列表
    this.getSelectCascaderListByCurrentUserDeptId();
    // 打开视图
    this.userSaveModalShowFlag = true;
  }

  // 以修改用户的方式打开编辑用户信息模态框
  userUpdateShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    this.userSaveParam = JSON.parse(JSON.stringify(this.selectUserInfo));
    // 生成选择的级联部门列表
    this.getSelectCascaderListByCurrentUserDeptId();
    // 打开视图
    this.userSaveModalShowFlag = true;
  }

  // 执行保存方法
  userSaveHandleSave(): void {
    this.userSaveLoading = true;
    if (this.userSaveParam == null) {
      this.notificationService.error('系统提示', '保存信息尚未初始化');
      return;
    }
    let saveUrl = this.USER_CREATE;
    if (this.userSaveParam.userId != null || this.userSaveParam.userId != undefined) {
      saveUrl = this.USER_UPDATE;
    }
    this.http.post(saveUrl, this.userSaveParam).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
        this.userSaveParam = null;
        this.searchUserList();
      },
      error => {
      },
      () => {
        this.userSaveLoading = false;
        this.userSaveModalShowFlag = false;
      }
    )
  }

  // 取消保存框
  userSaveHandleCancel(): void {
    // 取消视图显示
    this.userSaveModalShowFlag = false;
  }

  // 选择部门
  userSaveDeptCascaderChanges($event: any) {
    if (this.userSaveParam != null) {
      console.log($event)
      console.log($event.length)
      if ($event.length == 0) {
        this.userSaveParam.deptId = null;
      } else {
        this.userSaveParam.deptId = $event[$event.length - 1].id;
      }
    }
  }

  /////////////////////////// 重置用户密码
  confirmResetPwd() {
    if (this.selectUserInfo == null) {
      this.notificationService.error("系统提示", "请先选择一个用户操作");
      return;
    }

    this.http.post(this.USER_RESET_PWD, {userId: this.selectUserInfo.userId})
      .subscribe(
        res => {
          this.notificationService.success("系统提示", res.msg)
          this.searchUserList();
        }
      )

  }

  /////////////////////////// 删除用户信息
  confirmDelUser() {
    if (this.selectUserInfo == null) {
      this.notificationService.error("系统提示", "请先选择一个用户操作");
      return;
    }
    this.http.delete(this.USER_DELETE+this.selectUserInfo.userId)
      .subscribe(
        res => {
          this.notificationService.success("系统提示", res.msg)
          this.searchUserList();
        }
      )
  }


  // 根据用户的deptId 生成 选择中的级联列表数据
  getSelectCascaderListByCurrentUserDeptId() {
    if (this.deptCascader.length == 0 || this.userSaveParam == null || this.userSaveParam.deptId == null || this.userSaveParam.deptId == undefined) {
      this.selectCascaderDept = [];
    } else {
      let selectNode = this.findSelectNode(this.deptCascader, 6);
      let selectNodeList = this.genSelectList(selectNode, []);
      this.selectCascaderDept = selectNodeList;
    }
  }

  private findSelectNode(deptList: [], deptId: any): any {
    for (let dept of deptList) {
      if (dept['id'] == deptId) {
        return dept;
      } else {
        if (!dept['isLeaf']) {
          return this.findSelectNode(dept['children'], deptId)
        }
      }
    }
  }

  private genSelectList(currentNode: any, selectDeptList: any): any {
    selectDeptList.unshift(currentNode);
    if (currentNode['parent'] == null || currentNode['parent'] == undefined) {
      return selectDeptList;
    } else {
      let parent = this.findSelectNode(this.deptCascader, currentNode['parent']['id']);
      return this.genSelectList(parent, selectDeptList);
    }

  }

}
