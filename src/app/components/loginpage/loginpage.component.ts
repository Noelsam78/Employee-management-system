import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit{

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  id:any;
  loginDetails:any =[];
  empData:any = [];

  constructor(private auth:AuthService, private user: UserService, private router: Router, private toastr:ToastrService){}

  allEMployeeData(){
    this.user.getAllUserData().subscribe(res =>{
      this.auth.employeeData = res;
      this.empData = res;
    })
  }

  onSubmit(){
   
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        (result) => { 
         this.loginDetails = result;
          console.log(this.loginDetails)
          if(this.loginDetails.email == 'admin@slack.com' && this.loginDetails.password == 'admin123'){
            this.router.navigate(['admin']);
          }else{
            for(let i=0; i<this.empData.length; i++){
              if(this.loginDetails.email == this.empData[i].email && this.loginDetails.password == this.empData[i].password){
                this.id = this.empData[i].id
                this.router.navigate(['employee', this.id , 'profile']);
              }
            }
          }
         
        },
        (err: Error) => {
          this.toastr.error(err.message);
        }
      )
    }
  }
  

  ngOnInit(): void {
    this.allEMployeeData();
    if(this.auth.isLoggedIn()) {
        this.router.navigate(['admin']);  
    }
  }

}
