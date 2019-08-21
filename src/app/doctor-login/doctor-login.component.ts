import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateServiceService } from '../authenticate-service.service';
import { UserProfile } from '../userProfile';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenStorage } from '../core/token.storage';
import { DoctorServiceService } from '../doctor-service.service';


@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.scss']
})
export class DoctorLoginComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthenticateServiceService, private formBuilder: FormBuilder, 
    private dservice:DoctorServiceService,private token: TokenStorage) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      govtRegNo: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  govtRegNo: string;
  forgotPwd: string;
  password: string;
  user: UserProfile = new UserProfile();
  signin:boolean=true;
  forgot:boolean=false;

  formGroup: FormGroup;

  onForgotPwd(){
    if(this.forgot){
      this.forgot=false;
    }
    this.forgot=true;
    this.signin=false;
  }
  onSendPwd(){
  if(this.forgotPwd!=null){
  //  console.log(this.forgotPwd)
  this.dservice.sendPassword(this.forgotPwd).subscribe(
    data=>{window.alert("Password successfully sent to registered email");//console.log(data);
    this.forgot=false;this.signin=true;
    },
    error=>{window.alert("Something went wrong");this.forgot=false;this.signin=true;
    }
  )
  }
  else
  window.alert("First enter your reg. no")
  }
  onSubmit() {
    this.user.govtRegNo = this.govtRegNo;
    this.user.password = this.password;

    this.authservice.authenticateDoctor(this.user).subscribe(
      data => {
        this.token.saveTokenDoctor(data['token'], data['govtRegNo'], data['city'], data['doctorName']);
        console.log(data);
        this.router.navigate(['/doctor-dashboard']);
      },
      error => {
        console.log(error); window.alert("Authentication Failed");
        this.router.navigate(['/']);
      }
    )
  }
}
