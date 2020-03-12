import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParkWaitTimeComponent } from "./park-wait-time/park-wait-time.component";

const routes: Routes = [
    {path: "", component: ParkWaitTimeComponent }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}