import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private auth: AuthenticationService;

  constructor(private inj: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.auth = this.inj.get(AuthenticationService);
    let token = this.auth.getToken();
    let socialToken = this.auth.getSocialToken();

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }

    if (socialToken) {
      req = req.clone({ headers: req.headers.set('Authorization', socialToken) });
      this.auth.removeSocialToken();
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);

  }
}
