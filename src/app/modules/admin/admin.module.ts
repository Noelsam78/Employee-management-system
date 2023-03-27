import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { GuageChartComponent } from './components/guage-chart/guage-chart.component';
import { CreateNewEmployeeComponent } from './components/create-new-employee/create-new-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { TablePipe } from 'src/app/pipes/table.pipe';


@NgModule({
  declarations: [
    AdminPageComponent,
    DashboardComponent, 
    BarChartComponent,
    DoughnutChartComponent,
    GuageChartComponent,
    CreateNewEmployeeComponent,
    EmployeeDetailsComponent,
    TablePipe,
    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
