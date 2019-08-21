import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import { HospitalProfile } from './hospitalprofile';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/empty';
// import 'rxjs/add/operator/retry';

@Injectable({
  providedIn: 'root'
})
export class HospitalRegistrationServiceService {

  constructor(private _http:HttpClient, private router:Router) { }
  url='http://35.154.21.241:5000'
  
  createHospitalProfile(hprofile):Observable<HospitalProfile>{
    return this._http.post<HospitalProfile>(`${this.url}/api/hospital/register/`,hprofile)
    .pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse){

    
   let errorMessage='';
   if(error.status ===404||error.status===500){
     errorMessage=`Error:${error.error.message}`;
     
   }
   else{
     errorMessage=`Error Code:${error.status}\nMessage: ${error.message}`;
   } 
   window.alert(errorMessage);
   //this.router.navigate(['/']);
   return throwError(errorMessage);
  }
}
