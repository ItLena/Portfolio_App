import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Instrument, InstrumentPerformance } from '../models/instrument';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Instrument'

   
  getAll() : Observable<Instrument[]>{
    return this.http.get<Instrument[]>(this.apiUrl + '/instruments')
  }

  getPerformancesByInstrumentId(id: any) :Observable<InstrumentPerformance[]>{
    return this.http.get<InstrumentPerformance[]>(this.apiUrl + '/performances?instrumentId=' + id)
  }
 }