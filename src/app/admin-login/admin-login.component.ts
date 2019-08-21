import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateServiceService } from './../authenticate-service.service';
import { UserProfile } from '../userProfile';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import { HospitalServiceService } from './../hospital-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  formGroup:FormGroup;
  userId:string;
  password:string;
  user: UserProfile=new UserProfile();
  constructor(private formBuilder:FormBuilder, private hService:HospitalServiceService,
     private authService:AuthenticateServiceService, private router:Router,
    private token:TokenStorage) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  onSubmit(){
    this.user.govtRegNo = this.userId;
    this.user.password = this.password;
    this.authService.authenticateAdmin(this.user).subscribe(
      data=>{this.token.saveTokenAdmin(data['token'],data['userId'],data['emailId'],data['adminName']);
      console.log(data);
      this.router.navigate(['/admin-dashboard']);
      this.hService.saveAdminPassword(this.password);
    },
    error=>{console.log(error);
      window.alert("Something went wrong")
      this.router.navigate(['/admin-login']);}
    )
  }
}
