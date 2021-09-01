import {Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DeptInfoVo} from "./entity/dept.info.vo";
import {ResCreateParam} from "../resources/entity/res.create.param";
import {DeptCreateParam} from "./entity/dept.create.param";

@Component({
  selector: 'app-system-depts',
  templateUrl: './depts.component.html',
})
export class SystemDeptsComponent implements OnInit {


  ///////////URLS
  DEPT_TREE_QUERY = '/user-center-server/sys_dept/tree/query';
  DEPT_DELETE = '/user-center-server/sys_dept/delete/';
  DEPT_CREATE = '/user-center-server/sys_dept/create';

  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    // 获取部门树
    this.searchDeptTree();
  }

  /////////////////////////// 获取部门树
  deptSearchParam = null;
  deptTree: [] = [];
  deptSelectInfo: DeptInfoVo | null = null;

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
    if ($event.node.isSelected) {
      this.deptSelectInfo = $event.node.origin;
    } else {
      this.deptSelectInfo = null;
    }
    console.log(this.deptSelectInfo)
  }


  /////////////////////////// 删除部门
  confirmDeptDel() {
    if (this.deptSelectInfo == null) {
      this.notificationService.error("系统提示","请选择部门进行操作");
      return;
    }
    this.http.delete(this.DEPT_DELETE + this.deptSelectInfo.id)
      .subscribe(
        res=>{
          this.notificationService.success("系统提示","删除成功");
          this.searchDeptTree();
          this.deptSelectInfo = null;
        }
      )
  }



  /////////////////////////// 创建部门数据
  deptSaveParam: DeptCreateParam | null = null; // 保存部门参数
  deptSaveModalShowFlag = false; // 是否显示用户创建模态框
  deptSaveLoading = false; // 是否正在保存用户信息

  // 以创建用户的方式打开编辑用户信息模态框
  deptSaveShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.deptSaveParam == null) {
      this.deptSaveParam = new DeptCreateParam();
    }
    // 打开视图
    this.deptSaveModalShowFlag = true;
  }

  // 执行保存方法
  deptSaveHandleSave(): void {
    if (this.deptSelectInfo != null && this.deptSaveParam != null) {
      this.deptSaveParam.parentId = this.deptSelectInfo.id;
    }
    this.http.post(this.DEPT_CREATE, this.deptSaveParam).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
        this.searchDeptTree();
        this.deptSaveParam = null;
      },
      error => {
      },
      () => {
        this.deptSaveLoading = false;
        this.deptSaveModalShowFlag = false;
      }
    )

  }

  // 取消保存框
  deptSaveHandleCancel(): void {
    // 取消视图显示
    this.deptSaveModalShowFlag = false;
  }


}
