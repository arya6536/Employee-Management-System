package com.example.employee.controller;

import com.example.employee.exception.ResourceNotFoundException;
import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping("employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    @GetMapping("employee/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id){
      Employee employee = employeeRepository.findById(id).
              orElseThrow(()-> new ResourceNotFoundException("Employee not found with ID: " + id));
      return ResponseEntity.ok(employee);
    }
    @PutMapping("employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        Employee oldEmployee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with ID: " + id));

        oldEmployee.setFirstName(employee.getFirstName());
        oldEmployee.setLastName(employee.getLastName());
        oldEmployee.setEmailId(employee.getEmailId());

        employeeRepository.save(oldEmployee);
        return ResponseEntity.ok(oldEmployee);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id){
        Optional<Employee> employee = employeeRepository.findById(id);
        if(employee.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        employeeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
