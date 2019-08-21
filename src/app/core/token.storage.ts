import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

const TOKEN_KEY = 'AuthToken';
const USER_ID = 'govtRegNo';
const USER_ID_ADMIN = 'userId';
const CITY = 'city';
const HOSPITAL_NAME ='hospitalName';
const DOCTOR_NAME = 'doctorName';
const ADMIN_NAME = 'adminName';
const EMAIL_ID = 'emailId';
const helper = new JwtHelperService();

@Injectable()
export class TokenStorage{

    decodedToken:any;
    govtRegNo:any;
    userId:any;
    city:any;
    hospitalName:any;
    doctorName:any;
    adminName: any;
    emailId: any;
    authenticated:boolean=false;
    logout:boolean=false;

    constructor(){}

    public saveTokenHospital(token:string, govtRegNo:string, city:string, hospitalName:string){
        this.decodedToken = helper.decodeToken(token);
        this.govtRegNo = this.decodedToken.jti;
        this.hospitalName = this.decodedToken.name;
        this.city = this.decodedToken.sub;
        this.authenticated = true;

        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_ID);
        window.sessionStorage.setItem(TOKEN_KEY,token);
        window.sessionStorage.setItem(USER_ID, this.govtRegNo);
        window.sessionStorage.setItem(CITY,this.city);
        window.sessionStorage.setItem(HOSPITAL_NAME,this.hospitalName);
    }

    public saveTokenDoctor(token:string, govtRegNo:string, city:string, doctorName:string){
        this.decodedToken = helper.decodeToken(token);
        this.govtRegNo = this.decodedToken.jti;
        this.doctorName = this.decodedToken.name;
        this.city = this.decodedToken.sub;
        this.authenticated = true;

        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_ID);
        window.sessionStorage.setItem(TOKEN_KEY,token);
        window.sessionStorage.setItem(USER_ID, this.govtRegNo);
        window.sessionStorage.setItem(CITY,this.city);
        window.sessionStorage.setItem(DOCTOR_NAME,this.doctorName);
    }

    public saveTokenAdmin(token:string,userId:string,emailId:string, adminName:string){
        this.decodedToken = helper.decodeToken(token);
        this.userId = this.decodedToken.jti;
        this.adminName = this.decodedToken.name;
        this.emailId = this.decodedToken.sub;
        this.authenticated = true;

        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_ID_ADMIN);
        window.sessionStorage.setItem(TOKEN_KEY,token);
        window.sessionStorage.setItem(USER_ID_ADMIN, this.userId);
        window.sessionStorage.setItem(EMAIL_ID,this.emailId);
        window.sessionStorage.setItem(ADMIN_NAME,this.adminName);
        
    }

doctorLogout(){
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CITY);
    window.sessionStorage.removeItem(DOCTOR_NAME);
    this.logout = true;
    return this.logout;
   
}

adminLogout(){
    window.sessionStorage.removeItem(USER_ID_ADMIN);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(EMAIL_ID);
    window.sessionStorage.removeItem(ADMIN_NAME);
    this.logout=true;
    return this.logout;
}

hospitalLogout(){
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CITY);
    window.sessionStorage.removeItem(HOSPITAL_NAME);
    this.logout=true;
    return this.logout;
}
    public getToken(): string {

        return sessionStorage.getItem(TOKEN_KEY);
  
    }
    public getUserId(): string {

        return sessionStorage.getItem(USER_ID);
  
    }
    public getCity(): string {

        return sessionStorage.getItem(CITY);
  
    }
    public getDoctorName(): string {

        return sessionStorage.getItem(DOCTOR_NAME);
  
    }
    public getHospitalName(): string {

        return sessionStorage.getItem(HOSPITAL_NAME);
  
    }
    public getAdminUserId(): string {
        return sessionStorage.getItem(USER_ID_ADMIN);
    }
    isAuthenticated(){
        return this.authenticated;
    }
}