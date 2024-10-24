import { Component } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { error } from 'console';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent {

  id: number;
  employee: Employee ;

  constructor(
    private acivatedRoute : ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
  ){}

  ngOnInit(){
    this.id = this.acivatedRoute.snapshot.params['id'];
    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(data=>{
      this.employee = data;
    })
  }

  backPage(){
    this.router.navigateByUrl('employees');
  }
}
