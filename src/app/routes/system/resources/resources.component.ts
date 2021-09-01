import {Component, OnInit, ViewChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {RoleInfoVo} from "../roles/entity/role.info.vo";
import {RoleQueryParam} from "../roles/entity/role.query.param";
import {ResInfoVo} from "./entity/res.info.vo";
import {RoleSaveParam} from "../roles/entity/role.save.param";
import {ResCreateParam} from "./entity/res.create.param";

@Component({
  selector: 'app-system-resources',
  templateUrl: './resources.component.html',
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
export class SystemResourcesComponent implements OnInit {

  ///////////////URLS
  RES_TREE:string = '/user-center-server/sys_res/tree';
  RES_CREATE:string = '/user-center-server/sys_res/create';
  RES_DELETE:string = '/user-center-server/sys_res/delete/';


  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {
  }

  // 初始化方法
  ngOnInit(): void {

    // 获取资源树
    this.searchResTree();

  }


  /////////////////////////// 查询资源数据
  selectResInfo: ResInfoVo | null = null; // 当前选中的资源信息
  resTreeList: ResInfoVo[] = []; // 资源列表

  // 查询角色数据
  searchResTree() {
    this.http.get(this.RES_TREE).subscribe(
      res => {
        this.resTreeList = res.data;
      }
    );
  }

  // 点击树节点
  resTreeNodeClick($event: any) {
    if ($event.node.isSelected) {
      this.selectResInfo = $event.node.origin;
    } else {
      this.selectResInfo = null;
    }
    console.log(this.selectResInfo)
  }

  /////////////////////////// 创建资源数据
  resSaveParam: ResCreateParam | null = null; // 保存资源参数
  resSaveModalShowFlag = false; // 是否显示用户创建模态框
  resSaveLoading = false; // 是否正在保存用户信息

  // 以创建用户的方式打开编辑用户信息模态框
  resSaveShowModal(): void {
    // 打开创建视图之前先初始化一个保存参数实体类
    if (this.resSaveParam == null) {
      this.resSaveParam = new ResCreateParam();
    }
    // 打开视图
    this.resSaveModalShowFlag = true;
  }

  // 执行保存方法
  resSaveHandleSave(): void {
    if (this.selectResInfo != null && this.resSaveParam != null) {
      this.resSaveParam.parentId = this.selectResInfo.id;
    }
    this.http.post(this.RES_CREATE, this.resSaveParam).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
        this.searchResTree();
        this.resSaveParam = null;
      },
      error => {
      },
      () => {
        this.resSaveLoading = false;
        this.resSaveModalShowFlag = false;
      }
    )

  }

  // 取消保存框
  resSaveHandleCancel(): void {
    // 取消视图显示
    this.resSaveModalShowFlag = false;
  }


  /////////////////////////// 删除资源数据
  confirmResDel() {
    if (this.selectResInfo == null) {
      this.notificationService.error("系统提示","请选择资源进行操作");
      return;
    }
    this.http.delete(this.RES_DELETE + this.selectResInfo.id)
      .subscribe(
        res=>{
          this.notificationService.success("系统提示","删除成功");
          this.searchResTree();
          this.selectResInfo = null;
        }
      )
  }
}
