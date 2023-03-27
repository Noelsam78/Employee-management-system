import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  allEmpDetails:any = [];
  constructor(private api:ApiService, private router:Router, private toastr:ToastrService){}

  gatherAllEmpDetails(){
    return this.api.getEmployeeDetails().subscribe(response => {
      this.allEmpDetails = response;
    })
  }
  deleteEmployee(id:any){
    return this.api.delEmp(id).subscribe(res=>{
      window.location.reload();
    })
    
  }

  addEmployee(){
    this.router.navigate(['/admin/add']);
  }
  viewEmployee(id:any){
    this.router.navigate(['/admin/details', id])
  }

  ngOnInit(): void {
    this.gatherAllEmpDetails();
  }
}
