import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { Country}  from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit{
  empDetails:any = [];
  id:any; 
  show = true;
  @ViewChild('employeeData') form:NgForm | any;

  @ViewChild('country') country:any = ElementRef;
 
  countries = Country.getAllCountries();

  selectedCountry:any;
  constructor(private activateRouter: ActivatedRoute, private api:ApiService, private router: Router, private toastr:ToastrService){
    activateRouter.params.subscribe(res=>{
      this.id = res['id'];
      console.log(this.id);
    })
  }
  changeCountry($event:any) {
    this.selectedCountry = this.country.nativeElement.value;
	}
  getEmployeeDetails(id:any){
    return this.api.employeedetails(id).subscribe(res=>{
      this.empDetails = res;
    })
  }
  editEmployee(){
    this.show = !this.show
  }
  updateEmployee(updatedData:any){
    let id= this.empDetails.id;
    this.api.updateEmployeeDetails(id, updatedData).subscribe(res=>{
      console.log(res)
    })
    this.toastr.success("Employee details have been updated.")
    this.show = !this.show;
    window.location.reload();
  }

  deleteEmployee(id:any){
    return this.api.delEmp(id).subscribe(res=>{
      this.router.navigate(['admin']);
    })
  }

  ngOnInit(): void {
    this.getEmployeeDetails(this.id);
  }
}
