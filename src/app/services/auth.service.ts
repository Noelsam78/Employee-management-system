import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  employeeData:any = [];
  empid:string = '';

  constructor(private router:Router, private http:HttpClient) {

   }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  allempDetails(){
     return this.http.get('http://localhost:3000/employees');
  }

  getEmployeeData(){
    return this.http.get('http://localhost:3000/employees/'+ this.empid);
  }



  login({ email, password }: any): Observable<any> {
    console.log(this.employeeData)
    if (email === 'admin@slack.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ email , password });
    }else{
      for(let i=0; i<this.employeeData.length; i++){
        if(email == this.employeeData[i].email && password == this.employeeData[i].password){
          this.setToken('abcdefghijklmnopqrstuvwxyz');
          return of({ email , password });
        }
      }
    }
    return throwError(new Error('Incorrect email or password!!'));
  }

  ngOnInit(): void {
    
  }
}
