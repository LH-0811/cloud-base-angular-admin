import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";


import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from 'ng-zorro-antd/tree';
import {UserQueryParam} from "./entity/user.query.param";
import {UserInfoVo} from "./entity/user.info.vo";
import {UserCreateParam} from "./entity/user.create.param";


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
  selectCascaderDept:[] = []; // 选择的部门数据

  positionList: [] = []; // 岗位数据

  roleList: [] = []; // 角色数据

  // 获取部门
  getDeptCascader() {
    this.http.get("/user-center-server/sys_dept/cascader/query").subscribe(
      res => {
        this.deptCascader = res.data;
      },
      null,
      () => {
      })
  }

  // 获取岗位列表
  getPositionList() {

    this.http.get("/user-center-server/sys_position/query/all").subscribe(
      res => {
        this.positionList = res.data;
      },
      null,
      () => {
      })
  }

  // 获取角色列表
  getRoleList() {
    this.http.get("/user-center-server/sys_role/query/all_list").subscribe(
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
    this.http.post('/user-center-server/sys_dept/user/query', this.userQueryParam).subscribe(
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
  userCreateParam: UserCreateParam | null = null; // 保存用户参数
  userCreateModalShowFlag = false; // 是否显示用户创建模态框
  userCreateLoading = false; // 是否正在保存用户信息
  // 显示模态框方法

  userCreateShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.userCreateParam == null) {
      this.userCreateParam = new UserCreateParam();
      this.selectCascaderDept = [];
    }
    // 打开视图
    this.userCreateModalShowFlag = true;
  }

  // 执行保存方法
  userCreateHandleSave(): void {
    this.userCreateLoading = true;
    console.log(this.userCreateParam)
    this.http.post("/user-center-server/sys_user/create",this.userCreateParam).subscribe(
      res=>{
        this.notificationService.success("系统提示","用户创建成功");
        this.userCreateParam = null;
        this.searchUserList();
      },
      error => {},
      ()=>{
        this.userCreateLoading = false;
        this.userCreateModalShowFlag = false;
      }
    )
  }

  // 取消保存框
  userCreateHandleCancel(): void {
    // 取消视图显示
    this.userCreateModalShowFlag = false;
  }

  // 选择部门
  userCreateDeptCascaderChanges($event: any) {
    if (this.userCreateParam != null) {
      console.log($event)
      console.log($event.length)
      if ($event.length == 0) {
        this.userCreateParam.deptId = null;
      } else {
        this.userCreateParam.deptId = $event[$event.length - 1].id;
      }
    }
  }

  /////////////////////////// 重置用户密码
  confirmResetPwd(){
    if (this.selectUserInfo == null){
      this.notificationService.error("系统提示","请先选择一个用户操作");
      return;
    }

    this.http.post("/user-center-server/sys_user/reset/pwd",{userId:this.selectUserInfo.userId})
      .subscribe(
      res=>{this.notificationService.success("系统提示",res.msg)}
    )

  }
}
