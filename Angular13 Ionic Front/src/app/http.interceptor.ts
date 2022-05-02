import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';
import { LoaderService } from './shared/loader.service';
   
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private userService: UserService,
                private loader: LoaderService,
                private router: Router) { }
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let finished = false;

      setTimeout(async () => {
          if (!finished) await this.loader.present("", "lines");
      }, 3000);
      
      if(!(request.headers.get('Authorization')) && this.userService?.user?.token) {
        console.log( this.userService?.user?.token);
        
          request = request.clone({
            setHeaders: {
              'Authorization': 'Bearer ' + this.userService.user.token,
            } });
        }      

      return next.handle(request).pipe(
        tap(
          (event: HttpEvent<any>) => {},
          (error: HttpErrorResponse) => {
            if(error.status == 401){              
              this.router.navigateByUrl("/");
            }
            console.log(error);
            
          }
        ),

        finalize(() => {
          finished = true;
          this.loader.dismiss();
        })
      );
    }
  }