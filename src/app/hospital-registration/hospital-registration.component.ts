import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { HospitalProfile } from './../hospitalprofile';
import { HospitalRegistrationServiceService } from './../hospital-registration-service.service';
import {Router} from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.scss']
})
export class HospitalRegistrationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private hospitalRegistration:HospitalRegistrationServiceService, private router:Router) { }

  govtRegNo:string;
  hospitalName:string;
  emailId:string;
  phoneNumber:string;
  password:string;
  city:string;
  user:HospitalProfile = new HospitalProfile();

  formGroup1:FormGroup;
  formGroup2:FormGroup;
  formGroup3:FormGroup;
  
  myControl = new FormControl();
  options: string[] = ['Dharmanagar', 'Agartala', 'Udaipur','Belonia'];
  onSubmit(){
    this.user.city = this.city;
    this.user.emailId = this.emailId;
    this.user.hospitalName = this.hospitalName;
    this.user.phoneNumber = this.phoneNumber;
    this.user.password =this.password;
    this.user.govtRegNo = this.govtRegNo;
    //console.log(this.user);
    this.hospitalRegistration.createHospitalProfile(this.user).subscribe(
     response =>{ console.log(response); window.alert("Your Details Submitted Successfully"); this.router.navigate(['/hospital-login']);},
     (err:HttpErrorResponse)=>{console.log(err);this.router.navigate(['/']);}
    );
    
  }
 

  ngOnInit() {
    this.formGroup1 = this.formBuilder.group({
      hospitalName: ['',Validators.required]
    });
    this.formGroup2 = this.formBuilder.group({
      govtRegNo : ['',Validators.required],
      city : ['',Validators.required]
    });
    this.formGroup3 = this.formBuilder.group({
      emailId :['', [Validators.required, Validators.email]],
      phoneNumber : ['',[Validators.required, Validators.minLength(10)]],
      password : ['', [Validators.required, Validators.minLength(8)]]
    });

  }

}
