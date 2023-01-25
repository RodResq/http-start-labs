import { ReviewAuthInterceptorService } from './review-http/review-auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { CoreHttpComponent } from './core-http/core-http.component';
import { HttpWithPromisseComponent } from './http-with-promisse/http-with-promisse.component';
import { HttpWithObservableComponent } from './http-with-observable/http-with-observable.component';
import { ReviewHttpComponent } from './review-http/review-http.component';

@NgModule({
  declarations: [
    AppComponent, 
    CoreHttpComponent, 
    HttpWithPromisseComponent, 
    HttpWithObservableComponent, ReviewHttpComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReviewAuthInterceptorService,
      multi: true
    }
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
