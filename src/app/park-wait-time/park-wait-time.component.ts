import { Component, OnInit } from '@angular/core';
import { rideWaitTime } from './park-wait-time.model';
import { ParkWaitTimeService } from './park-wait-time.service';
import { NgxChartsModule, SeriesHorizontal } from '@swimlane/ngx-charts';
import {series} from './series.model'

@Component({
  selector: 'app-park-wait-time',
  templateUrl: './park-wait-time.component.html',
  styleUrls: ['./park-wait-time.component.css']
})
export class ParkWaitTimeComponent implements OnInit {

  rides: rideWaitTime[] = [];
  latestDisneyland: series[] = [];
  latestDisneyworld: series[] = [];

  //ngx chart options
  view= "";
  noBarWhenZero: boolean = false;
  barPadding = 2;
  trimYAxisTicks: boolean = false;
  legend: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Attraction';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Wait Time (min)';
  colorScheme = {
    domain: ['#C3F73A', '#5FBFF9', '#3C91E6', '#963484', '#3066BE']
  };


  constructor(public parkWaitTimeService: ParkWaitTimeService) { }

  ngOnInit() {

    this.getTimes();
    this.latestDisneyland = [...this.latestDisneyland]
  }


  getTimes() {
    this.parkWaitTimeService.getTimes()
      .toPromise().then(data => {
        this.rides = data.rides;
        this.getLatestDisneyland(data.rides);
      })

  }


 private getLatestDisneyland(rides: rideWaitTime[]) {
    let arr = rides
    let time = null
    let worldTime = null
    let count = 0
    let countw = 0
    arr.slice().reverse().forEach(ride => {
      if (ride.park == "Disneyland") {
         
        if (count == 0) {
          time = ride.date_created
          this.latestDisneyland.push({name: ride.name, value:ride.time})
        }
        else if (time == ride.date_created) {
          this.latestDisneyland.push({name: ride.name, value:ride.time})
        }
        count++
      }
      else{
        if(countw == 0){
          worldTime = ride.date_created
          this.latestDisneyworld.push({name: ride.name, value:ride.time})
        }
        else if(worldTime == ride.date_created){
          this.latestDisneyworld.push({name: ride.name, value:ride.time})
        }
        countw++
      }
    });
    //re-initialize data for ngx charts
    this.latestDisneyland.sort(this.compare);
    this.latestDisneyworld.sort(this.compare)
    this.latestDisneyland = [...this.latestDisneyland]
    this.latestDisneyworld = [...this.latestDisneyworld]
  }

  compare(a,b){
    const rideA = a.name
    const rideB = b.name

    if(rideA < rideB) return -1
    if(rideA > rideB) return 1
  }

}


