import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TestInterceptor implements HttpInterceptor{

  constructor(public loader: LoaderService, private toastr:ToastrService) {}

  intercept(req: HttpRequest<boolean>, next: HttpHandler): Observable<HttpEvent<boolean>> {

   
    return next.handle(req).pipe(
    tap(()=> {
      this.loader.isLoading.next(true);
    }),
    

      finalize(
        () => {
           this.loader.isLoading.next(false);
        }
      ),
      catchError((err:any)=>{
        if (err instanceof HttpErrorResponse) {

          this.toastr.error('Connection Failed',(err.status).toString());
          
        }
        return of (err)
      })
    )
    
  }
 
  
  
 
}
