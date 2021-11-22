export class YoujiTaskWorker {

  /**
   * 工作节点id主键
   */
  id: number | null = null;
  /**
   * 任务id
   */
  taskId: number | null = null;
  /**
   * 任务编号
   */
  taskNo: string | null = null;
  /**
   * 工作节点应用名称，配置文件中spring.application.name的配置
   */
  workerAppName: string | null = null;
  /**
   * 工作节点ip
   */
  workerIp: string | null = null;
  /**
   * 工作节点端口号
   */
  workerPort: number | null = null;
  /**
   * 工作节点是否可用
   */
  enableFlag: boolean | null = null;

  /**
   * 工作节点是否在线
   */
  onlineFlag: boolean | null = null;


  /**
   * 心跳失败累计数(成功-1，失败+1 到0为止)
   */
  beatFailNum: number | null = null;

  /**
   * 最后一次心跳时间
   */
  lastHeartBeatTime: number | null = null;


  /**
   * 执行任务的次数
   */
  execTaskNum: number | null = null;

  /**
   * 最后一次执行任务的时间
   */
  lastExecTime: number | null = null;
}
