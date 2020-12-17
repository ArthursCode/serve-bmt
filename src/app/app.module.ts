import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {PublicModule} from './public/public.module';
import {PrivateModule} from './private/private.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './common/auth/auth.service';
import {AuthGuard} from './common/auth/auth.guard';
import {BmtHttpInterceptor} from './common/interceptor/bmtHttpInterceptor';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {GuestGuard} from './common/auth/guest.guard';
import {ToastrModule} from 'ngx-toastr';
import {TokenInterceptorService} from './common/auth/token-interceptor.service';
import {SharedModule} from './shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './public/layouts/navbar/navbar.component';
import {FooterComponent} from './public/layouts/footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    PrivateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,

    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    NoopAnimationsModule,



    NgxUiLoaderModule.forRoot({
      bgsPosition: 'bottom-center',
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    GuestGuard,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: BmtHttpInterceptor,
      multi: true,
    },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true,
      }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
