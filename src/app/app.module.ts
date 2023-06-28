import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/person/register/register.component';
import { LoginComponent } from './components/person/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/person/userList/userList.component';

import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PortfolioDetailsComponent } from './components/portfolio/portfolio-details/portfolio-details.component';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { PortfolioListComponent } from './components/portfolio/portfolio-list/portfolio-list.component';
import { InstrumentListComponent } from './components/instrument/instrument-list/instrument-list.component';
import { InstrumentPerformanceDialogComponent } from './components/instrument/instrument-performance-dialog/instrument-performance-dialog.component';
import { TransaktionInstrumentDialogComponent } from './components/instrument/transaktion-instrument-dialog/transaktion-instrument-dialog.component';
import { TradingListComponent } from './components/trading/trading-list/trading-list.component';

@NgModule({
  declarations: [
    AppComponent,    
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    NavbarComponent,    
    PortfolioDetailsComponent,
    SideNavComponent,
    PortfolioListComponent,
    InstrumentListComponent,
    InstrumentPerformanceDialogComponent,
    TransaktionInstrumentDialogComponent,
    TradingListComponent,
   
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
