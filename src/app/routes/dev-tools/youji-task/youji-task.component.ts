import {Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {RoleInfoVo} from "../../system/roles/entity/role.info.vo";
import {RoleQueryParam} from "../../system/roles/entity/role.query.param";
import {YoujiTaskInfo} from "./entity/youji.task.info";
import {YoujiTaskQueryParam} from "./entity/youji.task.query.param";
import {YoujiTaskBaseInfoUpdateParam} from "./entity/youji.task.base.info.update.param";
import {YoujiTaskEnableUpdateParam} from "./entity/youji.task.enable.update.param";
import {YoujiTaskCronUpdateParam} from "./entity/youji.task.cron.update.param";
import {YoujiTaskLog} from "./entity/youji.task.log";
import {YoujiTaskLogQueryParam} from "./entity/youji.task.log.query.param";
import {YoujiTaskWorkerEnableParam} from "./entity/youji.task.worker.enable.param";
import {YoujiTaskWorker} from "./entity/youji.task.worker";

@Component({
  selector: 'app-dev-tools-youji-task',
  templateUrl: './youji-task.component.html',
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
export class DevToolsYoujiTaskComponent implements OnInit {
  /////////// URLS
  TASK_QUERY: string = '/youji-manage/youji/task/manage/query';
  TASK_UPDATE_CRON: string = '/youji-manage/youji/task/manage/update/cron';
  TASK_UPDATE_ENABLE: string = '/youji-manage/youji/task/manage/update/enable';
  TASK_UPDATE_BASE: string = '/youji-manage/youji/task/manage/update';
  TASK_EXEC_NOW: string = '/youji-manage/youji/task/manage/exec/';
  TASK_LOG_QUERY: string = '/youji-manage/youji/task/manage/log/query';
  TASK_WORKER_QUERY: string = '/youji-manage/youji/task/manage/work/list/';
  TASK_WORKER_ENABLE_CHANGE: string = '/youji-manage/youji/task/manage/worker/update/enable';


  //////////////////////////////// 初始化
  // 构造方法注入组件
  constructor(private http: _HttpClient, private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    // 获取任务列表
    this.searchTaskList();
  }


/////////////////////////// 查询任务数据
  selectTaskInfo: YoujiTaskInfo | null = null; // 当前选中的任务信息
  taskInfoList: YoujiTaskInfo[] = []; // 任务列表
  taskInfoTotal = 0; // 总数
  taskInfoPageNum = 1; // 页码
  taskInfoPageSize = 15; // 每页条数
  taskQueryParam: YoujiTaskQueryParam = new YoujiTaskQueryParam(); // 查询条件

  // 重置查询条件
  resetQuery() {
    this.taskQueryParam = new YoujiTaskQueryParam();
  }

  // 查询任务数据
  searchTaskList() {
    console.log(this.taskQueryParam)
    this.selectTaskInfo = null;
    this.http.post(this.TASK_QUERY, this.taskQueryParam).subscribe(
      res => {
        this.taskInfoList = res.data.list;
        this.taskInfoPageSize = res.data.pageSize;
        this.taskInfoPageNum = res.data.pageNum;
        this.taskInfoTotal = res.data.total;
        this.taskInfoList.forEach(ele => {
          ele.selected = false;
        });
      }
    );
  }

  // 修改页码
  taskInfoListPageIndexChange($event: number) {
    this.taskQueryParam.pageNum = $event;
    this.searchTaskList();
  }

  // 修改每页条数
  taskInfoListPageSizeChange($event: number) {
    this.taskQueryParam.pageSize = $event;
    this.searchTaskList();
  }

  // 选择某一行数据
  onSelectTaskInfoRow(id: any, selected: boolean) {
    // 去掉当前选择的组织
    this.selectTaskInfo = null;
    this.taskInfoList.forEach(ele => {
      if (selected == true) {
        if (ele.id == id) {
          ele.selected = true;
          this.selectTaskInfo = ele;
        } else {
          ele.selected = false;
        }
      } else {
        ele.selected = false;
      }
    });
    console.log(this.selectTaskInfo)
  }

/////////////////////////// 任务详情数据
  taskInfoDrawerShowFlag = false;
  taskInfoBaseUpdateParam: YoujiTaskBaseInfoUpdateParam = new YoujiTaskBaseInfoUpdateParam();

  taskInfoDrawerClose() {
    this.taskInfoDrawerShowFlag = false;
  }

  taskInfoDrawerOpen() {
    // 创建更新数据
    this.taskInfoBaseUpdateParam = JSON.parse(JSON.stringify(this.selectTaskInfo))
    this.taskInfoDrawerShowFlag = true;
  }

  taskInfoBaseUpdate() {
    this.http.post(this.TASK_UPDATE_BASE, this.taskInfoBaseUpdateParam).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
      }, error => {
      }, () => {
        this.searchTaskList()
        this.taskInfoDrawerShowFlag = false;
      }
    );
  }


/////////////////////////// 发起修改定时任务状态接口
  changeTaskEnableFlag() {
    let param = new YoujiTaskEnableUpdateParam();
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    param.id = this.selectTaskInfo.id
    param.enableFlag = !this.selectTaskInfo.enableFlag;
    this.http.post(this.TASK_UPDATE_ENABLE, param).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
      }, error => {
      }, () => {
        this.searchTaskList()
      }
    );
  }

/////////////////////////// 修改定时任务执行策略
  changeCronModalShowFlag: boolean = false; // 是否显示修改modal
  changeCronStr: string | null = null; // 要修改的执行计划

  changeCronModalShow() {
    this.changeCronModalShowFlag = true;
  }

  changeCronModalOk() {
    let param = new YoujiTaskCronUpdateParam();
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    if (this.changeCronStr == null || this.changeCronStr == '' || this.changeCronStr == undefined) {
      this.notificationService.error("系统提示", "请输入执行计划Cron");
      return;
    }
    param.id = this.selectTaskInfo.id
    param.cron = this.changeCronStr;
    this.http.post(this.TASK_UPDATE_CRON, param).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
        this.changeCronModalShowFlag = false;
      }, error => {
      }, () => {
        this.searchTaskList()
      }
    );
  }

  changeCronModalCancel() {
    this.changeCronModalShowFlag = false;
  }


/////////////////////////// 修改定时任务执行策略
  execTaskNow() {
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    this.http.get(this.TASK_EXEC_NOW + this.selectTaskInfo.taskNo).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
      }, error => {
      }, () => {
      }
    );
  }


/////////////////////////// 查询任务执行日志数据
  logModalShowFlag = false;

  logModalCancel() {
    this.logModalShowFlag = false;
  }

  logModalOk() {
    this.logModalShowFlag = false;
  }

  showLogModalOk() {
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    this.logModalShowFlag = true;
    this.searchTaskLogList();
  }


  selectTaskLog: YoujiTaskLog | null = null; // 当前选中的任务日志信息
  taskLogList: YoujiTaskLog[] = []; // 任务日志列表
  taskLogTotal = 0; // 总数
  taskLogPageNum = 1; // 页码
  taskLogPageSize = 15; // 每页条数
  taskLogQueryParam: YoujiTaskLogQueryParam = new YoujiTaskLogQueryParam(); // 查询条件

  // 重置查询条件
  resetLogQuery() {
    this.taskLogQueryParam = new YoujiTaskLogQueryParam();
  }

  // 查询任务数据
  searchTaskLogList() {
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    this.taskLogQueryParam.taskNo = this.selectTaskInfo.taskNo;
    this.http.post(this.TASK_LOG_QUERY, this.taskLogQueryParam).subscribe(
      res => {
        this.taskLogList = res.data.list;
        this.taskLogPageSize = res.data.pageSize;
        this.taskLogPageNum = res.data.pageNum;
        this.taskLogTotal = res.data.total;
        // this.taskLogList.forEach(ele => {
        //   ele.selected = false;
        // });
      }
    );
  }

  // 修改页码
  taskLogListPageIndexChange($event: number) {
    this.taskLogQueryParam.pageNum = $event;
    this.searchTaskLogList();
  }

  // 修改每页条数
  taskLogListPageSizeChange($event: number) {
    this.taskLogQueryParam.pageSize = $event;
    this.searchTaskLogList();
  }

  // 选择某一行数据
  onSelectTaskLogRow(id: any, selected: boolean) {
    // 去掉当前选择的组织
    this.selectTaskLog = null;
    this.taskLogList.forEach(ele => {
      if (selected == true) {
        if (ele.id == id) {
          // ele.selected = true;
          this.selectTaskLog = ele;
        } else {
          // ele.selected = false;
        }
      } else {
        // ele.selected = false;
      }
    });
    console.log(this.selectTaskLog)
  }

/////////////////////////// 查询任务工作节点
  workerListModalShowFlag = false;

  workerListModalCancel() {
    this.workerListModalShowFlag = false;
  }

  workerListModalOk() {
    this.workerListModalShowFlag = false;
  }

  showWorkerListModal() {
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    this.workerListModalShowFlag = true;
    this.searchTaskWorkerList();
  }

  workerList: YoujiTaskWorker[] = []; // 工作节点列表
  // workerListTotal = 0; // 总数
  // workerListPageNum = 1; // 页码
  // workerListPageSize = 15; // 每页条数
  // 查询任务数据
  searchTaskWorkerList() {
    if (this.selectTaskInfo == null) {
      this.notificationService.error("系统提示", "请选择一个任务操作");
      return;
    }
    this.http.get(this.TASK_WORKER_QUERY + this.selectTaskInfo.taskNo).subscribe(
      res => {
        console.log(res);
        this.workerList = res.data;
        // this.workerListPageSize = res.data.pageSize;
        // this.workerListPageNum = res.data.pageNum;
        // this.workerListTotal = res.data.total;
      }
    );
  }

  // 修改页码
  // workerListPageIndexChange($event: number) {
  //   this.searchTaskLogList();
  // }
  //
  // // 修改每页条数
  // workerListPageSizeChange($event: number) {
  //   this.searchTaskLogList();
  // }


  // 启用停用工作节点
  changeWorkerEnable(workerInfo: YoujiTaskWorker) {
    let param = new YoujiTaskWorkerEnableParam();
    param.id = workerInfo.id;
    param.enableFlag = !workerInfo.enableFlag;
    this.http.post(this.TASK_WORKER_ENABLE_CHANGE, param).subscribe(
      res => {
        this.notificationService.success("系统提示", res.msg);
      }, error => {
      }, () => {
        this.searchTaskWorkerList()
      }
    );
  }
}
