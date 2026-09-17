package com.example.employeerestapiwithjpa.model;


import jakarta.persistence.*;

@Entity
@Table(name="employee")
public class Employee {
    @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer employeeId;
    private String employeeName;
    private Integer age;
    private Double salary;
    private String department;
    private Boolean permanentEmployee;

    public Employee(){

    }

    public Employee(Integer emplpyeeId,String employeeName,Integer age,Double salary,String department,Boolean permanantEmployee){
       this.employeeId=employeeId;
        this.employeeName=employeeName;
        this.age=age;
        this.salary=salary;
        this.department=department;
        this.permanentEmployee=permanantEmployee;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Boolean getPermanentEmployee() {
        return permanentEmployee;
    }

    public void setPermanentEmployee(Boolean permanentEmployee) {
        this.permanentEmployee = permanentEmployee;
    }
}
