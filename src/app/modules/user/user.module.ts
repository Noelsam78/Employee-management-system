import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserPageComponent,
    ProfileComponent,
    LeaveApplyComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
