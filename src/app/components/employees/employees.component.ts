import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({
          html: 'Employee updated successfully'
        });
        this.getEmployees();
      });
    } else {
      this.employeeService.postEmployee(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({
          html: 'Employee saved successfully'
        });
        this.getEmployees();
      });
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string) {
    if (confirm('Are you sure?')) {
      this.employeeService.deleteEmployee(_id).subscribe(res => {
        M.toast({
          html: 'Employee deleted successfully'
        });
        this.getEmployees();
      });
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.employees = res as Employee[];
      console.log(res);
    });
  }

  resetForm(form?: NgForm) {// We put '?:' to params that can or can not exist
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
