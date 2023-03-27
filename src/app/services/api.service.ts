import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  empId:any;
  empData:any = [];
  constructor(private http:HttpClient) { }
  //Gets all employee Details
  getEmployeeDetails(){
    return this.http.get('http://localhost:3000/employees');
  }

  //Add a new Employee
  addNewEmployee(newEmp:any){
    return this.http.post('http://localhost:3000/employees', newEmp);
  }

  //Delete an employee
  delEmp(id:any){
    return this.http.delete('http://localhost:3000/employees/'+ id);
  }

  //gets Details of the employee with the id given
  employeedetails(id:any){
    return this.http.get('http://localhost:3000/employees/' + id);
  }

  //Updates the employee Details
  updateEmployeeDetails(id:any, data:any){
    this.empId = id;
    return this.http.put('http://localhost:3000/employees/' + id, data);
  }
  
  //Add an leave application
  leaveApplication(data:any){
    return this.http.post('http://localhost:3000/leavedata/', data);
  }

}
