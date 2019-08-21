import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { ViewChild, ViewEncapsulation } from "@angular/core";
import { RetrievedDoctorProfile } from '../retrievedDocotorProfile';
import { DoctorServiceService } from './../doctor-service.service';
import { TokenStorage } from '../core/token.storage';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.scss']
})
export class HospitalDashboardComponent implements OnInit {
  date: Date = new Date();
  d: string = this.date.toUTCString();
  dateString: string = this.d.split(' ', 4).join(' ');
  doctorProfiles: RetrievedDoctorProfile[] = new Array();
  showPending: boolean = false;
  showApproved: boolean = false;
  showRejected: boolean = false;
  status: string;
  panelOpenState = false;
  hlogout: boolean = false;

  viewPendingProfile(){
    if(this.showPending){
      this.showPending = false;
    }
    else
    this.showPending=true;
    this.showApproved=false;
    this.showRejected=false;
    this.drawer.close();
    
  }
  viewApprovedProfile(){
    if(this.showApproved){
      this.showApproved = false;
    }
    else
    this.showApproved=true;
    this.showRejected=false;
    this.showPending=false;
    this.drawer.close();
  }
  viewRejectedProfile(){
    if(this.showRejected){
      this.showRejected = false;
    } 
    else
    this.showRejected=true;
    this.showApproved=false;
    this.showPending=false;
    this.drawer.close();
  }
  openPopup(govtRegNo:string,status:string) {
    const modalRef = this.modalService.open(ApprovedModal);
    modalRef.componentInstance.govtRegNo = govtRegNo;
    modalRef.componentInstance.status = status;
   
  }
  openPopupReject(govtRegNo:string,status:string) {
    const modalRef = this.modalService.open(RejectModal);
    modalRef.componentInstance.govtRegNo = govtRegNo;
    modalRef.componentInstance.status = status;
   
  }
  adminLogOut(){
    this.hlogout = this.token.adminLogout();
    if(this.hlogout){
      const modalRef = this.modalService.open(LogoutModal);
      this.route.navigate(['/hospital-login']);
    }
    }
  constructor(private dservice: DoctorServiceService, private token:TokenStorage,private route:Router,
    private modalService: NgbModal) { }

  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;

  ngOnInit() {
    this.dservice.getAllDoctorProfileByHospitalId(this.token.getUserId()).subscribe(
      data=>{this.doctorProfiles = data; console.log(data)},
      error=>{console.error(error);}
    )
  }

}

import { Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'approved-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Attention!!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Do you want to approve this profile?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click');updateProfileStatus()">Yes</button>
      
    </div>
  `
})
export class ApprovedModal{
  @Input() govtRegNo:string;
  @Input() status:string;
  @Input() showRmessage:boolean;
  
  @Output() updateProfile = new EventEmitter();
  doctorProfiles: RetrievedDoctorProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private dservice:DoctorServiceService, private modalService: NgbModal,private token:TokenStorage) {}
  updateProfileStatus(){
    
    this.dservice.updateDoctorProfileStatus(this.govtRegNo,this.status).subscribe(
      data=>{console.log(data);
        this.updateProfile.emit();
        const modalRef = this.modalService.open(SuccessModal);
      },
      error=>{console.error(error);
      }
    )
   }
}

@Component({
  selector: 'reject-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Attention!!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Do you want to reject this profile?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click');updateProfileStatus()">Yes</button>
      
    </div>
  `
})
export class RejectModal{
  @Input() govtRegNo:string;
  @Input() status:string;
  @Input() showRmessage:boolean;
  
  @Output() updateProfile = new EventEmitter();
  doctorProfiles: RetrievedDoctorProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private dservice:DoctorServiceService, private modalService: NgbModal,private token:TokenStorage) {}
  updateProfileStatus(){
    
    this.dservice.updateDoctorProfileStatus(this.govtRegNo,this.status).subscribe(
      data=>{console.log(data);
        this.updateProfile.emit();
        const modalRef = this.modalService.open(SuccessModal);
      },
      error=>{console.error(error);
      }
    )
   }
}

@Component({
  selector: 'success-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Message!!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Profile updated</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">OK</button>
      
    </div>
  `
})
export class SuccessModal{
  @Input() govtRegNo:string;
  @Input() status:string;
  
  @Output() updateProfile = new EventEmitter();
  doctorProfiles: RetrievedDoctorProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private dservice:DoctorServiceService, private token:TokenStorage) {}
  
}
@Component({
  selector: 'logout-modal',
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
export class LogoutModal{
  @Input() govtRegNo:string;
  @Input() status:string;
  
  @Output() updateProfile = new EventEmitter();
  doctorProfiles: RetrievedDoctorProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private dservice:DoctorServiceService, private token:TokenStorage) {}
  
}