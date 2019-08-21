import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { ViewChild, ViewEncapsulation } from "@angular/core";
import { HospitalServiceService } from './../hospital-service.service';
import { TokenStorage } from './../core/token.storage';
import { RetrievedHospitalProfile } from '../retrievedHospitalProfile';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  date: Date = new Date();
  d: string = this.date.toUTCString();
  dateString: string = this.d.split(' ', 4).join(' ');
  hospitalProfiles: RetrievedHospitalProfile[] = new Array();
  showPending: boolean = false;
  showApproved: boolean = false;
  showRejected: boolean = false;
  status: string;
  panelOpenState = false;
  alogout: boolean = false;

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

  
  onClickUpdate(sts:string){
  this.status = sts;
  }

  openPopup(govtRegNo:string,status:string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.govtRegNo = govtRegNo;
    modalRef.componentInstance.status = status;
   
  }
  openPopupReject(govtRegNo:string,status:string) {
    const modalRef = this.modalService.open(RejectModalContent);
    modalRef.componentInstance.govtRegNo = govtRegNo;
    modalRef.componentInstance.status = status;
   
  }
  updateHospitalProfiles(){
    this.hService.getAllHospitalByAdminId(this.token.getAdminUserId()).subscribe(
      data=>{this.hospitalProfiles = data;},
      error=>{console.error(error);
      }
    )
  }
  adminLogOut(){
  this.alogout = this.token.adminLogout();
  if(this.alogout){
    const modalRef = this.modalService.open(LogoutModalContent);
    this.route.navigate(['/admin-login']);
  }
  }

  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;

  constructor(private hService:HospitalServiceService, private token:TokenStorage,private route:Router,
     private modalService: NgbModal) { }

  ngOnInit() {
    this.hService.getAllHospitalByAdminId(this.token.getAdminUserId()).subscribe(
      data=>{this.hospitalProfiles = data;},
      error=>{console.error(error);
      }
    )
  }

}


import { Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-modal-content',
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
export class NgbdModalContent{
  @Input() govtRegNo:string;
  @Input() status:string;
  @Input() showRmessage:boolean;
  
  @Output() updateProfile = new EventEmitter();
  hospitalProfiles: RetrievedHospitalProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private hService:HospitalServiceService, private modalService: NgbModal,private token:TokenStorage) {}
  updateProfileStatus(){
    
    this.hService.updateProfileStatus(this.govtRegNo,this.status).subscribe(
      data=>{console.log(data);
        this.updateProfile.emit();
        const modalRef = this.modalService.open(SuccessModalContent);
      },
      error=>{console.error(error);
      }
    )
   }
}

@Component({
  selector: 'reject-modal-content',
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
export class RejectModalContent{
  @Input() govtRegNo:string;
  @Input() status:string;
  @Input() showRmessage:boolean;
  
  @Output() updateProfile = new EventEmitter();
  hospitalProfiles: RetrievedHospitalProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private hService:HospitalServiceService, private modalService: NgbModal,private token:TokenStorage) {}
  updateProfileStatus(){
    
    this.hService.updateProfileStatus(this.govtRegNo,this.status).subscribe(
      data=>{console.log(data);
        this.updateProfile.emit();
        const modalRef = this.modalService.open(SuccessModalContent);
      },
      error=>{console.error(error);
      }
    )
   }
}

@Component({
  selector: 'success-modal-content',
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
export class SuccessModalContent{
  @Input() govtRegNo:string;
  @Input() status:string;
  
  @Output() updateProfile = new EventEmitter();
  hospitalProfiles: RetrievedHospitalProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private hService:HospitalServiceService, private token:TokenStorage) {}
  
}
@Component({
  selector: 'logout-modal-content',
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
export class LogoutModalContent{
  @Input() govtRegNo:string;
  @Input() status:string;
  
  @Output() updateProfile = new EventEmitter();
  hospitalProfiles: RetrievedHospitalProfile[] = new Array();
  constructor(public activeModal: NgbActiveModal,private hService:HospitalServiceService, private token:TokenStorage) {}
  
}