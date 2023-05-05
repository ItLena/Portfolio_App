import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/person/register/register.component';
import { LoginComponent } from './components/person/login/login.component';
import { UserListComponent } from './components/person/userList/userList.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard.canActivate]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
