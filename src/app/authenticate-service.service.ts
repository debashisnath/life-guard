import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {

  constructor(private _http:HttpClient, private router:Router) { }
  isHospitalAuthenticated : boolean = false;
  url='http://35.154.21.241:5000';
  getUser(user):Observable<any>{
  return this._http.post<any>(`${this.url}/api/hospital/login`,user)
  .pipe(catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    let errorMessage='';
    if(error.status===404||error.status===500){
      errorMessage=`Error:${error.error.message}`;
      
    }
    else if(error.status===401){
      window.alert("Your Profile yet not approved");
    }
    else{
      errorMessage=`Error Code:${error.status}\nMessage: ${error.message}`;
    } 
    window.alert("Something went wrong");
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  authenticateDoctor(user):Observable<any>{
    return this._http.post<any>(`${this.url}/api/doctor/login`,user)
    .pipe(catchError(this.handleError));
  }

  authenticateAdmin(user):Observable<any>{
    return this._http.post<any>(`${this.url}/api/admin/login`,user)
    .pipe(catchError(this.handleError));
  }
}
