import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private snackbar: MatSnackBar, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = this.auth.getToken();

    if(jwtToken != null){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${jwtToken}`}
      });
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            const message = 'Token is expired, Please Log In Again';

            this.snackbar.open(message, 'DISMISS', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition:'center'
            });
            this.route.navigate(['login']);
          }
        }
        return throwError(()=>new Error("Some error occured"))
      })

      
    );
  }
}
