export class YoujiTaskQueryParam {

  /**
   * （1-通过URL触发 2-遍历容器中的bean触发）
   */
  taskType: string | null = null;

  /**
   * 执行方式 (1-单节点执行 2-全节点执行)
   */
  execType: string | null = null;

  /**
   * 任务编号
   */
  taskNo: string | null = null;

  /**
   * 任务名称
   */
  taskName: string | null = null;

  /**
   * 联系人
   */
  contactsName: string | null = null;
  /**
   * 联系人电话
   */
  contactsPhone: string | null = null;
  /**
   * 联系人邮箱
   */
  contactsEmail: string | null = null;

  /**
   * 是否可用
   */
  enableFlag: boolean | null = null;

  /**
   * 页码
   */
  pageNum: number = 1;

  /**
   * 每页条数
   */
  pageSize: number = 15;

}
