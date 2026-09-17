package com.example.apidemo.controller;

import org.springframework.web.bind.annotation.*;
import com.example.apidemo.model.Employee;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private List<Employee> employees=new ArrayList<>();

    public EmployeeController(){
        employees.add(
                new Employee(
                        101,
                        "Pradeep",
                        21,
                        80000,
                        "HR",
                        true
                )
        );
        employees.add(
                new Employee(
                        102,
                        "Nethra",
                        20,
                        90000,
                        "IT",
                        true
                )
        );
        employees.add(
                new Employee(
                        103,
                        "Nithish",
                        21,
                        85000,
                        "Admin",
                        true
                )
        );
    }

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employees;
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id){
        for(Employee employee:employees){
            if(employee.getEmployeeId()==id){
                return employee;
            }
        }
        return null;

    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee newEmployee){
        employees.add(newEmployee);
        return newEmployee;
    }
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable int id,@RequestBody Employee updatedEmployee)
    {
        for(Employee employee:employees)
        {
            if(employee.getEmployeeId()==id){
                employee.setEmployeeName(
                        updatedEmployee.getEmployeeName()
                        );
                employee.setAge(
                        updatedEmployee.getAge()
                );
                employee.setDepartment(
                        updatedEmployee.getDepartment()
                );
                employee.setSalary(
                        updatedEmployee.getSalary()
                );
                employee.setPermanentEmployee(
                        updatedEmployee.isPermanentEmployee()
                );
                return employee;

            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable int id)
    {
        for(Employee employee:employees){
            if(employee.getEmployeeId()==id){
                employees.remove(employee);
                return "Employee deleted successfully";
            }
        }
        return "Employee not found ";
    }

}
