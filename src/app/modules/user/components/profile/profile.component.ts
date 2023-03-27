import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Country}  from 'country-state-city';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  empDetails:any = [];
  // id:any;
  @ViewChild('employeeData') form:NgForm | any;

  @ViewChild('country') country:any = ElementRef;
 
  countries = Country.getAllCountries();

  selectedCountry:any;
 
  id:any;
  show = true;
  @Input() empid:any

  constructor(private activateRouter: ActivatedRoute ,private api: AuthService, private http:ApiService, private user:UserService){
    // this.activateRouter.params.subscribe(res=>{
    //   this.id = res['id'];
      // })
      this.id = this.user.userId;
  }
  
  changeCountry($event:any) {
    this.selectedCountry = this.country.nativeElement.value;
	}
 

  employeeDetails(id:any){
    this.user.getUserData(id).subscribe(res => {
      this.empDetails = res;
      console.log(res);
    })
  }
 
  editEmployee(){
    this.show = !this.show;
  }
  updateEmployee(updatedData:any){
    this.http.updateEmployeeDetails(this.id, updatedData).subscribe(res=>{
      console.log(res)
    })
    this.show = !this.show;
    window.location.reload();
  }

  ngOnInit(): void {
    
    this.employeeDetails(this.id);
   
    console.log(this.id);
  }
}
