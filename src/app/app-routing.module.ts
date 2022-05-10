import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UrgenciesComponent} from "./emergencies/urgencies/pages/urgencies/urgencies.component";
import {GuardiansComponent} from "./emergencies/guardians/pages/guardians/guardians.component";

const routes: Routes = [
  {path: 'home', component: GuardiansComponent},
  {path: 'urgencies',component: UrgenciesComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
