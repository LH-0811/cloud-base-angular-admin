export class YoujiTaskBaseInfoUpdateParam {
  /**
   * 主键
   */
  id: number | null = null;

  /**
   * （1-通过URL触发 2-遍历容器中的bean触发）
   */
  taskType:string|null = null;

  /**
   * 执行方式 (1-单节点执行 2-全节点执行)
   */
  execType:string|null = null;

  /**
   * 任务编号
   */
  taskNo:string|null = null;

  /**
   * 任务名称
   */
  taskName:string|null = null;

  /**
   * 任务执行触发的url地址
   */
  taskUrl:string|null = null;

  /**
   * 应用上下文执行中对应的全限定类名
   */
  taskBeanName:string|null = null;

  /**
   * 应用上下文中对应的方法名，或者url的请求类型
   */
  taskMethod:string|null = null;

  /**
   * 执行参数(参数:只支持字符串类型参数)
   */
  taskParam:string|null = null;

  /**
   * 联系人
   */
  contactsName:string|null = null;

  /**
   * 联系人电话
   */
  contactsPhone:string|null = null;

  /**
   * 联系人邮箱
   */
  contactsEmail:string|null = null;

}
