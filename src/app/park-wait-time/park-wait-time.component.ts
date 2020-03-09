import { Component, OnInit } from '@angular/core';
import { rideWaitTime } from './park-wait-time.model';
import { ParkWaitTimeService } from './park-wait-time.service'
import { Subscription } from "rxjs";


@Component({
  selector: 'app-park-wait-time',
  templateUrl: './park-wait-time.component.html',
  styleUrls: ['./park-wait-time.component.css']
})
export class ParkWaitTimeComponent implements OnInit {

  rides;


  constructor(public parkWaitTimeService: ParkWaitTimeService) { }

  ngOnInit() {

    this.parkWaitTimeService.getTimes()
    .subscribe((rideData) => {
       this.rides = rideData;
    })

  }

}
