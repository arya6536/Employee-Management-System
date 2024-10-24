import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [RouterLink,
    FormsModule,
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {

  id:number;
  employee: Employee = new Employee();


  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data=>{
      this.employee = data;
    },error=>console.error(error));
  }

  onSubmit(){
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data=>{
      this.router.navigateByUrl('/employees');
    })
  }
  backPage(){
    this.router.navigateByUrl('employees');
  }
}

