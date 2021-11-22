export class YoujiTaskLog {


  /**
   * 主键id
   */
  id: number | null = null;
  /**
   * 工作节点id
   */
  workerId: number | null = null;
  /**
   * 任务编号
   */
  taskNo: string | null = null;
  /**
   * 任务名称
   */
  taskName: string | null = null;
  /**
   * 任务执行表达式
   */
  corn: string | null = null;
  /**
   * 任务执行触发的url地址
   */
  taskUrl: string | null = null;
  /**
   * 应用上下文执行中对应的全限定类名
   */
  taskBeanName: string | null = null;
  /**
   * 应用上下文中对应的方法名，或者url的请求类型
   */
  taskMethod: string | null = null;
  /**
   * 参数:只支持字符串类型参数
   */
  taskParam: string | null = null;
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
   * 是否执行完成
   */
  finishFlag: boolean | null = null;
  /**
   * 执行结果信息
   */
  resultMsg: string | null = null;
  /**
   * 创建时间
   */
  createTime: null | null = null;
  /**
   * 更新时间
   */
  updateTime: null | null = null;
}
