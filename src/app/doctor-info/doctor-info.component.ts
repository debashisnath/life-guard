import { Component, OnInit } from '@angular/core';
import { DoctorServiceDetails } from '../doctorServiceDetails';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  dsDetails: DoctorServiceDetails[] = new Array();

  constructor(private dservice: DoctorServiceService) { }

  ngOnInit() {
    this.dservice.getDoctorDetailsByCity().subscribe(
      data => { this.dsDetails = data; console.log(this.dsDetails) },
      error => { }
    )
  }

}
