export class TenantInfoCreateParam {
  /**
   * 租户名称
   */
  tenantName: any;
  /**
   * 租户简称
   */
  tenantSimpleName: any;

  /**
   * 租户英文名称
   */
  tenantEnglishName: any;
  /**
   * 租户英文简称
   */
  tenantEnglishSimpleName: any;

  contactsName: any;

  contactsPhone: any;

  contactsEmail: any;
  /**
   * 是否可用
   */
  activeFlag: boolean = false;
  /**
   * 备注
   */
  remark: any;
}
