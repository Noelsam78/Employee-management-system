import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  {path:'', component:UserPageComponent,
   children:[
    {path: 'profile', component:ProfileComponent},
    {path: 'leaveapply', component:LeaveApplyComponent},
    {path: '', redirectTo: '/employee/:id/profile', pathMatch:'full'}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
  