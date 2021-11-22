export class YoujiTaskLogQueryParam {

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
   * 执行时间(起)
   * @private
   */
  execTimeLow: number | null = null;

  /**
   * 执行时间(止)
   * @private
   */
  execTimeUp: number | null = null;

  /**
   * 是否执行完成
   */
  finishFlag: boolean | null = null;

  pageNum = 1;

  pageSize = 15;
}
