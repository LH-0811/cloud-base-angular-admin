import {Component, OnInit, ViewChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {UserInfoVo} from "../users/entity/user.info.vo";
import {UserQueryParam} from "../users/entity/user.query.param";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {RoleInfoVo} from "./entity/role.info.vo";
import {RoleQueryParam} from "./entity/role.query.param";
import {UserSaveParam} from "../users/entity/user.save.param";
import {RoleSaveParam} from "./entity/role.save.param";

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

  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {
  }

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
    console.log(this.roleQueryParam)
    this.http.get('/user-center-server/sys_res/tree', this.roleQueryParam).subscribe(
      res => {
        this.allResTree = res.data;
      }
    );
  }
  allResTreeClick($event:any){
    console.log($event);
  }

  /////////////////////////// 查询用户数据
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
    console.log(this.roleQueryParam)
    this.http.post('/user-center-server/sys_role/query', this.roleQueryParam).subscribe(
      res => {
        this.roleInfoList = res.data.list;
        this.roleInfoPageSize = res.data.pageSize;
        this.roleInfoPageNum = res.data.pageNum;
        this.roleInfoTotal = res.data.total;
        this.roleInfoList.forEach(ele => {
          ele.selected = false;
        });
      }
    );
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
    console.log(this.selectRoleInfo)
  }



  /////////////////////////// 新增角色数据
  roleSaveParam: RoleSaveParam | null = null; // 保存用户参数
  roleSaveModalShowFlag = false; // 是否显示用户创建模态框
  roleSaveLoading = false; // 是否正在保存用户信息
  @ViewChild("roleSaveTree")
  roleSaveTree:any;
  // 显示模态框方法

  // 以创建用户的方式打开编辑用户信息模态框
  roleSaveShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.roleSaveParam == null || (this.roleSaveParam.id != null || this.roleSaveParam.id != undefined)) {
      this.roleSaveParam = new RoleSaveParam();
    }
    // 打开视图
    this.roleSaveModalShowFlag = true;
  }

  // 以修改用户的方式打开编辑用户信息模态框
  roleUpdateShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    this.roleSaveParam = JSON.parse(JSON.stringify(this.selectRoleInfo));
    // 生成选择的级联部门列表
    // 打开视图
    this.roleSaveModalShowFlag = true;
  }

  // 执行保存方法
  roleSaveHandleSave(): void {
    console.log(this.roleSaveTree)
    console.log(this.roleSaveTree.getCheckedNodeList())
    /*this.roleSaveLoading = true;
    if (this.roleSaveParam == null) {
      this.notificationService.error('系统提示', '保存信息尚未初始化');
      return;
    }
    let saveUrl = "/user-center-server/sys_res/create";
    if (this.roleSaveParam.id != null || this.roleSaveParam.id != undefined) {
      saveUrl = "/user-center-server/sys_res/update";
    }
    this.http.post(saveUrl, this.roleSaveParam).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
        this.roleSaveParam = null;
        this.searchRoleList();
      },
      error => {
      },
      () => {
        this.roleSaveLoading = false;
        this.roleSaveModalShowFlag = false;
      }
    )*/
  }

  // 取消保存框
  roleSaveHandleCancel(): void {
    // 取消视图显示
    this.roleSaveModalShowFlag = false;
  }

}
