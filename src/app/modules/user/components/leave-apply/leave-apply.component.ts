import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss']
})
export class LeaveApplyComponent {
  
  constructor(private api:ApiService, private toastr: ToastrService){}

  applyLeave(leaveData:any){
    this.api.leaveApplication(leaveData).subscribe(res=>{
      
      console.log(res);
    })
    this.toastr.success("Leave Application is submitted");
  }
}
