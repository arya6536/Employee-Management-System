import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8081/api/v1/";

  constructor(private httpClient: HttpClient) { }

  getEmployeesList():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.baseURL + 'employees');
  }
  
  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(this.baseURL + 'employees' , employee);
  }

  getEmployeeById(id:number): Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseURL + `employee/${id}`);
  }

  updateEmployee(id:number, employee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(this.baseURL + `employee/${id}`, employee);
  }

  deleteEmployee(id:number): Observable<any>{
    return this.httpClient.delete(this.baseURL + `delete/${id}`,);
  }

}
