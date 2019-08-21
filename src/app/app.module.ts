import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HomePageComponent } from './home-page/home-page.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { AppRoutingModule } from './app-routing.module';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { HospitalLoginComponent } from './hospital-login/hospital-login.component';
import { HospitalRegistrationComponent } from './hospital-registration/hospital-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HospitalDashboardComponent, ApprovedModal, SuccessModal, RejectModal, LogoutModal,  } from './hospital-dashboard/hospital-dashboard.component';
import { TokenStorage } from './core/token.storage';
import { AuthenticateServiceService } from './authenticate-service.service';
import { DoctorDashboardComponent, LogoutModalComponent} from './doctor-dashboard/doctor-dashboard.component';
import { enableProdMode } from '@angular/core';
import { routingComponents } from './app-routing.module';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { 
	IgxButtonModule,
	IgxIconModule,
	IgxLayoutModule,
	IgxNavigationDrawerModule,
	IgxRippleModule,
  IgxToggleModule,
  IgxSwitchModule,
  IgxRadioModule
 } from "igniteui-angular";
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import { DialogComponent } from './doctor-dashboard/dialog.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent, NgbdModalContent, SuccessModalContent, RejectModalContent, LogoutModalContent } from './admin-dashboard/admin-dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HomePageComponent,
    DoctorLoginComponent,
    DoctorRegistrationComponent,
    HospitalLoginComponent,
    HospitalRegistrationComponent,
    HospitalDashboardComponent,
    DoctorDashboardComponent,
    DoctorInfoComponent,
    DialogComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    NgbdModalContent,
    SuccessModalContent,
    RejectModalContent,
    LogoutModalContent,
    ApprovedModal,
    SuccessModal,
    RejectModal,
    LogoutModal,
    LogoutModalComponent
  ],
  entryComponents: [DialogComponent,NgbdModalContent,SuccessModalContent,LogoutModalContent,RejectModalContent,
  ApprovedModal, SuccessModal, RejectModal, LogoutModal, LogoutModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgbModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    HttpClientModule,
    HttpModule,
    IgxButtonModule,
		IgxIconModule,
		IgxLayoutModule,
		IgxNavigationDrawerModule,
		IgxRippleModule,
    IgxToggleModule,
    IgxSwitchModule,
    IgxRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [TokenStorage, AuthenticateServiceService, CanActivateRouteGuard],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
