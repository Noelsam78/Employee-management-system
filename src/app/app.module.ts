import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { TestInterceptor } from './interceptors/test.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Error404Component } from './components/error404/error404.component';
import { TablePipe } from './pipes/table.pipe'
@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    Error404Component,
    // TablePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true
    }),
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: TestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
