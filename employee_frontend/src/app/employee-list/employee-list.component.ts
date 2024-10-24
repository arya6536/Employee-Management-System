import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor,
    HttpClientModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: Employee[];
  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,

  ){}

  ngOnInit(): void{
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeService.getEmployeesList().subscribe(data=>{
      this.employees = data;
    })
  }

  updateEmployee(id:number){
    this.router.navigateByUrl(`update-employee/${id}`);
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe(data=>{
      this.getAllEmployees();
    })
  }

  viewEmployee(id:number){
    this.router.navigateByUrl(`employee-profile/${id}`);
  }

  showDetails(employee: Employee) {
    this.selectedEmployee = employee;
  }

  hideDetails() {
    this.selectedEmployee = null;
  }
}
