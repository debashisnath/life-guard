import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DoctorProfile } from './doctorprofile';

@Injectable({
  providedIn: 'root'
})
export class DoctorRegistrationService {

  constructor(private _http:HttpClient, ) { }
  url='http://35.154.21.241:5000';
  registerDoctor(dprofile):Observable<DoctorProfile>{
    return this._http.post<DoctorProfile>(`${this.url}/api/doctor/register/`,dprofile)
    .pipe(catchError(this.handleError));
  }
  handleError(error:HttpErrorResponse){
    let errorMessage='';
    if(error.status===404||error.status===500){
      errorMessage=`Error:${error.error.message}`;
      
    }
    else{
      errorMessage=`Error Code:${error.status}\nMessage: ${error.message}`;
    } 
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
