import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {ALAIN_I18N_TOKEN, _HttpClient} from '@delon/theme';
import {environment} from '@env/environment';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, take} from 'rxjs/operators';

const CODEMESSAGE: { [key: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private refreshTokenEnabled = environment.api.refreshTokenEnabled;
  private refreshTokenType: 're-request' | 'auth-refresh' = environment.api.refreshTokenType;
  private refreshToking = false;
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private injector: Injector) {

  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private get tokenSrv(): ITokenService {
    return this.injector.get(DA_SERVICE_TOKEN);
  }

  private get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase): void {
    if ((ev.status == undefined) || ((ev.status >= 200 && ev.status < 300) || ev.status === 401)) {
      return;
    } else {
      const errortext = CODEMESSAGE[ev.status] || ev.statusText;
      this.notification.error(`请求错误`, errortext);
    }
  }

  private toLogin(): void {
    this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
    this.goTo('/passport/login');
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        if (ev instanceof HttpResponse) {
          // 忽略 Blob 文件体
          if (ev.body instanceof Blob) {
            return of(ev);
          }
          const body = ev.body;
          if (body && body.status == 401) {
            debugger
            this.toLogin();
            return throwError({});
          }else {
            if (body && body.status != 0) {
              let data = (body.data == null || body.data == undefined) ? '': body.data
              this.notification.error(`请求错误`, `${body.msg}:${data}`);
              return throwError({});
            } else {

              // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
              // return of(new HttpResponse(Object.assign(ev, { body: body.response })));
              // 或者依然保持完整的格式
              return of(ev);
            }
          }
        }
        break;
      case 401:
        this.toLogin();
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn(
            '未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng-alain.com/docs/server 解决跨域问题',
            ev
          );
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  private getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
    const res: { [name: string]: string } = {};
    const lang = this.injector.get(ALAIN_I18N_TOKEN).currentLang;
    if (!headers?.has('Accept-Language') && lang) {
      res['Accept-Language'] = lang;
    }

    return res;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.api.baseUrl + url;
    }

    let tokenModel: any = (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).get();
    let newReq: any = null;
    if (tokenModel.hasOwnProperty('token')) {
      newReq = req.clone({
        url: url,
        headers: new HttpHeaders({
          LHTOKEN: tokenModel.token
        })
      });
    } else {
      newReq = req.clone({
        url: url
      });
    }

    return next.handle(newReq).pipe(
      mergeMap(ev => {
        // 允许统一对请求错误处理
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        // 若一切都正常，则后续操作
        return of(ev);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))
    );
  }
}
