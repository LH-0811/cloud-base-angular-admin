export class UserSaveParam {
  /**
   * 用户id
   */
  userId: any;

  /**
   * 昵称
   */
  nickName: any;

  /**
   * 所属部门id
   */
  deptId: any;

  /**
   * 电话
   */
  phone: any;

  /**
   * 邮箱
   */
  email: any;

  /**
   * 用户名
   */
  username: any;

  /**
   * 性别 0-保密 1-男 2-女
   */
  gender: any = '0';

  /**
   * 岗位id列表
   */
  positionIdList: any;

  /**
   * 岗位id列表
   */
  roleIdList: any;

  /**
   * 是否可用
   */
  activeFlag: any = true;
}
