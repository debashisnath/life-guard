import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DoctorServiceService } from './../doctor-service.service';
import { TokenStorage } from '../core/token.storage';
import { DoctorProfile } from '../doctorprofile';
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { ViewChild, ViewEncapsulation } from "@angular/core";
import { DoctorServiceDetails } from '../doctorServiceDetails';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {VERSION} from '@angular/material';
import { DialogComponent } from './dialog.component';
import {MatSnackBar} from '@angular/material';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  version = VERSION;

  dialogRef: MatDialogRef<DialogComponent>;
  
  constructor(private modalService: NgbModal, private snackBar: MatSnackBar,private dservice: DoctorServiceService, private token: TokenStorage, private route: Router,private dialog: MatDialog) { }

  date: Date = new Date();
  d: string = this.date.toUTCString();
  dateString: string = this.d.split(' ', 4).join(' ');
  showProfile: boolean = false;
  register: boolean = false;
  dlogout: boolean = false;
  saved: boolean = false;
  edit: boolean = false;
  dprofile: DoctorProfile = new DoctorProfile();

  specialistIn: string;
  address: string;
  availabilityUpto: Date;
  degree: string;
  message: string;
  dServiceDetails: DoctorServiceDetails = new DoctorServiceDetails();
  retrievedDoctorServiceDetails: DoctorServiceDetails = new DoctorServiceDetails();
  updatedDoctorServiceDetails: DoctorServiceDetails = new DoctorServiceDetails();

  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent);
    this.route.navigate(['/']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });}
  onClick() {
    if (this.showProfile) {
      this.showProfile = false;

    }
    else
      this.showProfile = true;
    this.register = false;
    this.edit = false;
    this.drawer.close();
  }

  onClickSubmit() {
    if (this.register) {
      this.register = false;

    }
    else
      this.register = true;
    this.showProfile = false;
    this.edit = false;
    this.drawer.close();
  }
  onClickEdit() {
    if (this.edit) {
      this.edit = false;
    }
    else
      this.edit = true;
    this.register = false;
    this.showProfile = false;
    this.drawer.close();
  }

  onSave() {
    this.dServiceDetails.doctorProfile.city = this.dprofile.city;
    this.dServiceDetails.doctorProfile.doctorName = this.dprofile.doctorName;
    this.dServiceDetails.doctorProfile.emailId = this.dprofile.emailId;
    this.dServiceDetails.doctorProfile.govtRegNo = this.dprofile.govtRegNo;
    this.dServiceDetails.doctorProfile.hospitalName = this.dprofile.hospitalName
    this.dServiceDetails.doctorProfile.phoneNumber = this.dprofile.phoneNumber;
    this.dServiceDetails.address = this.address;
    this.dServiceDetails.availabilityUpto = this.availabilityUpto.toString().split(' ', 4).join(' ');
    this.dServiceDetails.degree = this.degree;
    this.dServiceDetails.message = this.message;
    this.dServiceDetails.specialistIn = this.specialistIn;

    this.dservice.saveDoctorDetails(this.dServiceDetails).subscribe(
      data => { console.log(data); window.alert("Data successfully saved"); this.saved = true },
      error => { console.log(error); window.alert("Something went wrong") }
    )
    // console.log(this.availabilityUpto.toUTCString().split(' ', 4).join(' ').slice(5,16));


  }

  onClickUpdate() {
    this.updatedDoctorServiceDetails.availabilityUpto=this.retrievedDoctorServiceDetails.availabilityUpto.toString().split(' ', 4).join(' ');
    this.updatedDoctorServiceDetails.address = this.retrievedDoctorServiceDetails.address;
    this.updatedDoctorServiceDetails.degree = this.retrievedDoctorServiceDetails.degree;
    this.updatedDoctorServiceDetails.doctorProfile = this.retrievedDoctorServiceDetails.doctorProfile;
    this.updatedDoctorServiceDetails.message = this.retrievedDoctorServiceDetails.message;
    this.updatedDoctorServiceDetails.specialistIn = this.retrievedDoctorServiceDetails.specialistIn;
    this.dservice.updateDoctorServiceDetails(this.updatedDoctorServiceDetails).subscribe(
      data => { console.log(data); window.alert("Data successfully updated"); },
      error => {
        console.error(error); window.alert("Something went wrong");
      }
    )
  }

  onClickLogout() {
    this.dlogout = this.token.doctorLogout();
    if (this.dlogout) {
    // window.alert("You have successfully Logged out");
    // this.openDialog()
      // this.openSnackBar("You have successfully logged out","Ok");
      const modalRef = this.modalService.open(LogoutModalComponent);
      this.route.navigate(['/doctor-login']);
    }

    this.drawer.close();
  }

  
  ngOnInit() {
    this.dservice.getDoctorProfile(this.token.getUserId()).subscribe(
      data => {
        this.dprofile = data;
        console.log(data);
      },
      error => {
        console.log(error); window.alert("Authentication Failed");
      }
    )
    this.dservice.getDoctorDetails(this.token.getUserId()).subscribe(
      data => { this.retrievedDoctorServiceDetails = data; this.saved = true },
      error => { console.log(error) }
    )
  }

}

@Component({
  selector: 'logout-modal-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Message!!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>You have been successfully logged out!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      
    </div>
  `
})
export class LogoutModalComponent{
  @Input() govtRegNo:string;
  @Input() status:string;
  
  @Output() updateProfile = new EventEmitter();
 
  constructor(public activeModal: NgbActiveModal) {}
  
}