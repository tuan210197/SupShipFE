import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,) { }

  getProvince(): Observable<any>{
    return this.http.get<any>('http://localhost:8085/province');
  }

  getDistrictById(cityId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8085/district?provinceCode=${cityId}`);
  }

  getWardById(district: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8085/ward?districtCode=${district}`);
  }
}
