import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HospitalServiceService } from '../hospital-service.service';
import { HospitalProfile } from '../hospitalprofile';
import { DoctorProfile } from '../doctorprofile';
import { DoctorRegistrationService } from '../doctor-registration.service';
import { HttpErrorResponse } from '@angular/common/http';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class DoctorRegistrationComponent implements OnInit {

  doctorName : string;
  phoneNumber : string;
  emailId : string;
  hospitalName : string;
  password : string;
  govtRegNo : string;
  city : string;
  myControl = new FormControl();
  myControl1 = new FormControl();
  cities: string[] = ['Dharmanagar', 'Agartala', 'Udaipur','Belonia'];
  hprofiles: HospitalProfile[] = new Array();
  dprofile: DoctorProfile = new DoctorProfile();

  firstFormGroup : FormGroup;
  secondFormGroup  : FormGroup;
  thirdFormGroup : FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router, private hservice:HospitalServiceService, private dservice:DoctorRegistrationService) { }
 
  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      doctorName: ['',Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      hospitalName : ['',Validators.required],
      govtRegNo : ['',Validators.required],
      city : ['',Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      emailId :['', [Validators.required, Validators.email]],
      phoneNumber : ['',[Validators.required, Validators.minLength(10)]],
      password : ['', [Validators.required, Validators.minLength(8)]]
    });
    
  
  }
  onChange(city){
    console.log(city+' '+"clicked");
    this.hservice.getHospitalsByCity(city).subscribe(
      data=>{this.hprofiles=data;
       //  console.log(data)
        },
      error=>{console.log(error)}
    )
  }
  onSubmit(){
    if(this.password.length>=8){
    this.dprofile.city = this.city;
    this.dprofile.doctorName = this.doctorName;
    this.dprofile.emailId = this.emailId;
    this.dprofile.govtRegNo = this.govtRegNo;
    this.dprofile.hospitalName = this.hospitalName;
    this.dprofile.phoneNumber = this.phoneNumber;
    this.dprofile.password = this.password;
    console.log(this.dprofile);
    this.dservice.registerDoctor(this.dprofile).subscribe(
      response=>{console.log(response);window.alert("Your details submitted successfully");
      this.router.navigate(['/doctor-login'])
      },
      (err:HttpErrorResponse)=>{console.log(err);window.alert("Something went wrong");
      this.router.navigate(['/'])}
    )
    }
    else{
      window.alert("Please provide valid password")
    }

  }

  // constructor(private _formBuilder: FormBuilder) {}

  // ngOnInit() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     doctorName: ['', Validators.required]
  //   });
  //   this.secondFormGroup = this._formBuilder.group({
  //     // hospitalName: ['', Validators.required],
  //     govtRegNo : ['',Validators.required],
  //   });
 // }

}
