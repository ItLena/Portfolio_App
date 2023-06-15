import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/person/register/register.component';
import { LoginComponent } from './components/person/login/login.component';
import { UserListComponent } from './components/person/userList/userList.component';

import { AuthGuard } from './guards/auth.guard';
import { PortfolioListComponent } from './components/portfolio/portfolio-list/portfolio-list.component';
import { PortfolioDetailsComponent } from './components/portfolio/portfolio-details/portfolio-details.component';
import { InstrumentListComponent } from './components/instrument/instrument-list/instrument-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},  
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'instruments', component: InstrumentListComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'editUser/:id', component: RegisterComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'portfolios', component: PortfolioListComponent, canActivate: [AuthGuard.canActivate]},
  {path: 'portfolios/:id', component: PortfolioDetailsComponent, canActivate: [AuthGuard.canActivate]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
