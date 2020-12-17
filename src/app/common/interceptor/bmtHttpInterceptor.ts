import { finalize, tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class BmtHttpInterceptor implements HttpInterceptor{

  count = 0;

  constructor(private spinner: NgxUiLoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.startBackgroundLoader('master');

    this.count++;

    return next.handle(req)
      .pipe(tap(), finalize(() => {
        this.count--;
        if ( this.count === 0 ) {
          this.spinner.stopBackgroundLoader('master');
        }
        })
      );
  }
}
