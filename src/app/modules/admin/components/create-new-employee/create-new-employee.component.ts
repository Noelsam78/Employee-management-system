import { Component, ElementRef, ViewChild } from '@angular/core';
import { Country}  from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.scss']
})
export class CreateNewEmployeeComponent {

  @ViewChild('country') country:any = ElementRef;
 
  countries = Country.getAllCountries();

  selectedCountry:any;
 
  constructor(private http:ApiService, private toastr:ToastrService){}

  changeCountry($event:any) {
    this.selectedCountry = this.country.nativeElement.value;
	}


  addEmployee(newEmployee:any){
    console.log(newEmployee)
    this.http.addNewEmployee(newEmployee).subscribe(res => {
    })
    this.toastr.success("New Employee is Added");
  }
}
