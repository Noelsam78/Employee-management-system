import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {  } from '../profile/profile.component';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
 

  id:any;
  constructor(private auth: AuthService, private activateRouter:ActivatedRoute ,private route:Router, private user:UserService){
    this.activateRouter.params.subscribe(res=>{
      this.id = res['id'];
      console.log(this.id);
      })  
      this.user.userId = this.id;
  }
  

  ngOnInit(): void {
    
  }
 
  logout(){
    this.auth.logout();
  }
  
}
