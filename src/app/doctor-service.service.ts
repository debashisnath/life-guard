import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DoctorServiceDetails } from './doctorServiceDetails';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  pwd: string;
  saveHospitalPassword(password:string){
  this.pwd = password;
  }

  constructor(private _http: HttpClient) { }
  city: string;
  url = "http://35.154.21.241:5000";
  _url = "http://35.154.21.241:5001";

  setSelectedCity(scity) {
    this.city = scity;
  }

  getDoctorProfile(govtRegNo: string): Observable<any> {
    return this._http.get<any>(`${this.url}/api/doctor/view/` + govtRegNo)
      .pipe(catchError(this.handleError));
  }

  getDoctorDetailsByCity(): Observable<any> {
    return this._http.get<any>(`${this._url}/api/doctordetails/` + this.city)
      .pipe(catchError(this.handleError))
  }

  getDoctorDetails(govtRegNo: string): Observable<any> {
    return this._http.get<any>(`${this._url}/api/doctordetail/` + govtRegNo)
      .pipe(catchError(this.handleError));
  }

  saveDoctorDetails(doctorServiceDetails: DoctorServiceDetails): Observable<any> {
    return this._http.post<any>(`${this._url}/api/doctordetails/`, doctorServiceDetails)
      .pipe(catchError(this.handleError1))
  }

  updateDoctorServiceDetails(doctorServiceDetails: DoctorServiceDetails): Observable<any> {
    return this._http.put<any>(`${this._url}/api/doctordetails/`, doctorServiceDetails)
      .pipe(catchError(this.handleError))
  }
  sendPassword(govtRegNo:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this._http.get<any>(this.url+'/api/doctor/forgotpassword/'+govtRegNo,{ headers, responseType: 'text' as 'json' })
    .pipe (catchError(this.handleError))
  }

  updateDoctorProfileStatus(govtRegNo:string, status:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    console.log(govtRegNo);
    console.log(status);
    
    console.log(this.url+`/api/doctor/`+govtRegNo+`/`+status);
    return this._http.get<any>(this.url+'/api/doctor/'+govtRegNo+'/'+status,{ headers, responseType: 'text' as 'json' })
    .pipe(catchError(this.handleError));
  }
  
  getAllDoctorProfileByHospitalId(userId:string):Observable<any>{
    return this._http.get<any>(`${this.url}/api/doctor/viewall/`+userId+`/`+this.pwd)
    .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {

    let errorMessage = '';
    if (error.status === 404 || error.status === 500) {
      errorMessage = `Error:${error.error.message}`;
 
    }
    else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  handleError1(error: HttpErrorResponse) {

    let errorMessage = '';
    if (error.status === 409) {
      errorMessage = 'You have already saved details';

    }
    else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  handleError2(error: HttpErrorResponse) {

    let errorMessage = '';
    if (error.status != 200) {
     // errorMessage = 'You have already saved details';
     window.alert("Something went wrong!");
    }
    if (error.status === 200) {
      // errorMessage = 'You have already saved details';
      window.alert("Password successfully sent to registered email");
     }
    // else {
    //   errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    // }
    // window.alert(errorMessage);
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

}
