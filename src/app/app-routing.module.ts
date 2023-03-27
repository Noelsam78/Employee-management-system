import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component:LoginpageComponent},
  
  {path: 'admin', canActivate: [AuthGuard],
  loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)},
  {path : 'employee/:id', canActivate: [AuthGuard],
   loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule)},
  {path: '',  redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component:Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
