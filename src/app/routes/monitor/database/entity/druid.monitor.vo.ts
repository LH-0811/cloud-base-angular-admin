export class DruidMonitorVo {
  // 服务名")
  serviceName: string | null = null;

  // 服务地址列表")
  addressList: AddressVo[] = [];
}

export class AddressVo {
  // 地址")
  host: string | null = null;
  // druid 监控地址")
  druidUrl: string | null = null;
}
