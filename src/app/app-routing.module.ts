import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCustomersComponent } from './compnants/all-customers/all-customers.component';
import { CustomerDetailsComponent } from './compnants/customer-details/customer-details.component';
import { HomeComponent } from './compnants/home/home.component';
import { TrancstionComponent } from './compnants/trancstion/trancstion.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path:"customer/:id",component: CustomerDetailsComponent},
  {path:"alltransctions",component: TrancstionComponent},
  {path:"allCustomers",component: AllCustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
