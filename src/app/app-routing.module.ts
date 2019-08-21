import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { HospitalLoginComponent } from './hospital-login/hospital-login.component';
import { HospitalRegistrationComponent } from './hospital-registration/hospital-registration.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
const routes: Routes = [

  {path:'',component:HomePageComponent},
  {path:'doctor-login',component:DoctorLoginComponent},
  {path:'doctor-registration',component:DoctorRegistrationComponent},
  {path:'hospital-login',component:HospitalLoginComponent},
  {path:'hospital-registration',component:HospitalRegistrationComponent},
  {path:'doctor-info', component:DoctorInfoComponent},
  {path:'hospital-dashboard',component:HospitalDashboardComponent, canActivate: [CanActivateRouteGuard]},
  {path:'doctor-dashboard',component:DoctorDashboardComponent,canActivate: [CanActivateRouteGuard]},
  {path:'admin-login',component:AdminLoginComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate: [CanActivateRouteGuard]}
];
@NgModule({
  declarations: [], 
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomePageComponent, DoctorLoginComponent, DoctorRegistrationComponent, HospitalLoginComponent, HospitalRegistrationComponent, HospitalDashboardComponent,
DoctorDashboardComponent, DoctorInfoComponent, AdminLoginComponent, AdminDashboardComponent];
