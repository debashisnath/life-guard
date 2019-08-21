import { Component, OnInit } from '@angular/core';
import { UserProfile } from './../userProfile';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticateServiceService } from './../authenticate-service.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import { DoctorServiceService } from '../doctor-service.service';
@Component({
  selector: 'app-hospital-login',
  templateUrl: './hospital-login.component.html',
  styleUrls: ['./hospital-login.component.scss']
})
export class HospitalLoginComponent implements OnInit {

  constructor(private authService:AuthenticateServiceService, private dservice:DoctorServiceService, private router:Router, private formBuilder:FormBuilder, private token:TokenStorage) { }
  formGroup:FormGroup;
  govtRegNo:string;
  password:string;
  isauthenicated: boolean = false;
  user: UserProfile=new UserProfile();
  
  ngOnInit() {
    this.formGroup=this.formBuilder.group({
      govtRegNo: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.user.govtRegNo = this.govtRegNo;
    this.user.password = this.password;
    console.log(this.user)
    this.authService.getUser(this.user).subscribe(
      data=>{this.token.saveTokenHospital(data['token'],data['govtRegNo'],data['city'],data['hospitalName']);
      this.dservice.saveHospitalPassword(this.password);
      this.isauthenicated = true;
      console.log(data);
      this.router.navigate(['/hospital-dashboard']);
    },
    error=>{console.log(error);
      window.alert("Something went wrong")
      this.router.navigate(['/']);}
    )
  }

  isAuthenticated(){
    return this.isauthenicated;
  }
}
