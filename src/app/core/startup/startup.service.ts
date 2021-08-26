import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import {Observable, zip, of, pipe} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(): Observable<void> {

    var token = this.tokenService.get();
    if (JSON.stringify(token) == '{}'){
      return of();
    }

    return  this.httpClient.get('/user-center-server/sys_user/current_user_info').pipe(
      catchError((res: NzSafeAny) => {
        return of({});
      }),
      map((res: NzSafeAny) => {
        console.log("用户信息:"+res)
        // var token = this.tokenService.get();
        // Application information: including site name, description, year
        let app = {
          name: 'Alain',
          description: 'Ng-zorro admin panel front-end framework'
        };
        this.settingService.setApp(app);
        var userInfo = res.data.userInfo;
        let user = {
          name: userInfo.nickName,
          avatar: './assets/tmp/img/avatar.jpg',
          email: userInfo.email,
          phone: userInfo.phone
        };
        this.settingService.setUser(user);
        this.aclService.setFull(true);
        let menu = res.data.menuList;
        this.menuService.add(menu);
        this.titleService.suffix = app.name;
      })
    );
  }

  load(): Observable<void> {
    // http
    return this.viaHttp();
  }
}
