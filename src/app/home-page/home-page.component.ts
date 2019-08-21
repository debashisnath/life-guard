import { Component, OnInit } from '@angular/core';
import { HospitalServiceService } from './../hospital-service.service';
import { Router } from '@angular/router';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  image1: any ="../assets/Agartala.jpg"
  image2: any = "../assets/img2.jpg"
  image3: any = "../assets/img3.jpg"

  city:string;
  constructor(private hservice:HospitalServiceService, private route:Router, private dservice:DoctorServiceService) { }

  onSelect(selectedcity){
    this.city=selectedcity;
    this.dservice.setSelectedCity(this.city);
    this.route.navigate(['/doctor-info'])
    console.log(this.city);
  }
  ngOnInit() {
  }

}
