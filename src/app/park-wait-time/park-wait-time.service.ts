import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { rideWaitTime } from "./park-wait-time.model";
import { stringify } from 'querystring';

const BACKEND_URL = environment.apiUrl + "/wait-times/";

@Injectable({ providedIn: "root" })
export class ParkWaitTimeService {

    private rides: rideWaitTime[] = [];
    private ridesUpdated = new Subject<{ rides: rideWaitTime[] }>();

    constructor(private http: HttpClient, private router: Router) { }

    getTimes() {
        return this.http.get<{ message: string; data: any; }>(BACKEND_URL)
            .pipe(map(rideData => {
                return {
                    rides: rideData.data.map(ride => {
                        return {
                            name: ride.name,
                            time: ride.time,
                            park: ride.park,
                            status: ride.status,
                            date_created: ride.date_created
                        }
                    })
                }
            }))
    }

}