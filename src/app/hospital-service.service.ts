import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import { HospitalProfile } from './hospitalprofile';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HospitalServiceService {

  pwd:string;
  saveAdminPassword(pwd:string){
  this.pwd = pwd;
  }
  
  constructor(private _http:HttpClient) { }
  url="http://35.154.21.241:5000";
  _url="http://35.154.21.241:5001";

  
  getHospitalsByCity(city:string):Observable<any>{
    return this._http.get<any>(`${this.url}/api/hospitals/view/`+city)
    .pipe(catchError(this.handleError));
  }
  
  getAllHospitalByAdminId(userId:string):Observable<any>{
    return this._http.get<any>(`${this.url}/api/hospital/viewall/`+userId+`/`+this.pwd)
    .pipe(catchError(this.handleError));
  }

  updateProfileStatus(govtRegNo:string, status:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    console.log(govtRegNo);
    console.log(status);
    
    console.log(this.url+`/api/hospital/`+govtRegNo+`/`+status);
    return this._http.get<any>(this.url+'/api/hospital/'+govtRegNo+'/'+status,{ headers, responseType: 'text' as 'json' })
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
    console.log(errorMessage);
    return throwError(errorMessage);
   }
}
