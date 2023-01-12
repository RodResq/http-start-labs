import { LoggingInterceptorService } from './logging-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { CoreHttpComponent } from './core-http/core-http.component';
import { HttpWithPromisseComponent } from './http-with-promisse/http-with-promisse.component';

@NgModule({
  declarations: [AppComponent, CoreHttpComponent, HttpWithPromisseComponent],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: LoggingInterceptorService, 
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: AuthInterceptorService, 
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
