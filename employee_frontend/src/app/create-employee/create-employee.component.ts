import { Component } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule,
    RouterLink,
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  employee: Employee = new Employee();

  constructor(
    private router:Router,
    private employeeService: EmployeeService,

  ){}

  ngOnInit() : void{

  }

  onSubmit(){
    this.employeeService.createEmployee(this.employee).subscribe(data=>{
      this.router.navigateByUrl('/employees');
    })
  }

  backPage(){
    this.router.navigateByUrl('employees');
  }
}
