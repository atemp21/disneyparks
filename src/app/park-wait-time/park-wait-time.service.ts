import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { rideWaitTime } from "./park-wait-time.model";

const BACKEND_URL = environment.apiUrl + "/wait-times/";

@Injectable({providedIn: "root"})
export class ParkWaitTimeService{

    private rides: rideWaitTime[] = [];
    private ridesUpdated = new Subject<{rides: rideWaitTime[]}>();

    constructor(private http: HttpClient, private router: Router){}

    getTimes(){
      return  this.http.get<{
            _id: string;
            name: string;
            time: number;
        }>(BACKEND_URL);
    }
}