import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CreateNewEmployeeComponent } from './components/create-new-employee/create-new-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

const routes: Routes = [
  {path: '', component:AdminPageComponent,
   children:[
    {path: 'dashboard', component:DashboardComponent},
    {path: 'add', component:CreateNewEmployeeComponent},
    {path: 'details/:id', component:EmployeeDetailsComponent},
    {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'}
   ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
