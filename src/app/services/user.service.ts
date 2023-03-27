import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId:any;
  constructor(private http:HttpClient) { }
//Gets all employee details
  getAllUserData(){
    return this.http.get('http://localhost:3000/employees');
  }

  //Gets employee details with the given id
  getUserData(id:any){
    return this.http.get('http://localhost:3000/employees/' + id);
  }

  //Updates employee details
  updateUserData(id:any, data:any){
    return this.http.put('http://localhost:3000/employees/' + id, data);
  }
}
