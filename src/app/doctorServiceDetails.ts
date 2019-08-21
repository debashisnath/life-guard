import { DoctorProfile } from "./doctorprofile";

export class DoctorServiceDetails{
    doctorProfile: DoctorProfile = new DoctorProfile() ;
    specialistIn: string;
    address: string;
    availabilityUpto: string;
    degree: string;
    message: string;
}