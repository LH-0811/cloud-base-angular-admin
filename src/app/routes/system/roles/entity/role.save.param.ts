export class RoleSaveParam {

  // "主键id")
  id: any;

  // "角色名称", required = true)
  name: any;

  // "角色编号")
  no: any;

  // "状态 是否可用默认可用", required = true)
  activeFlag = true;

  // "排序 (升序)")
  sortNum: any;

  // "备注")
  notes: any;

  // "资源id列表")
  resIdList: any;


  /**
   * 角色资源列表
   */
  sysResList:any;

  /**
   * 角色资源树
   */
  sysResTree:any;

}
