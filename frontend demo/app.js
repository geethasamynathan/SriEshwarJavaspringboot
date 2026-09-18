function loadEmployees(){
    fetch('http://localhost:8080/employees')
    .then(response => response.json())
    .then(employees => {
        const tableBody = document.getElementById('employeeTableBody');
        tableBody.innerHTML = '';
        employees.forEach(employee => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = employee.employeeId;
            row.insertCell(1).textContent = employee.employeeName;
            row.insertCell(2).textContent = employee.age;
            row.insertCell(3).textContent = employee.salary;
            row.insertCell(4).textContent = employee.department;
            row.insertCell(5).textContent = employee.permanentEmployee;

            const actionCell = row.insertCell(6);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick=() => {
                // Implement edit functionality here
               editEmployee(employee)
            }
             const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick=() => {
                // Implement delete functionality here
              deleteEmployee(employee.employeeId)
            }

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);
        });
    });
}

function addEmployee(){
  // const employeeId = document.getElementById('employeeId').value;
    const employeeName = document.getElementById('employeeName').value;
    const age = document.getElementById('age').value;
    const salary = document.getElementById('salary').value;
    const department = document.getElementById('department').value;
    const permanentEmployee = document.getElementById('permanent').checked;

    const employee = {
       // employeeId: employeeId,
        employeeName: employeeName,
        age: parseInt(age),
        salary: parseFloat(salary),
        department: department,
        permanentEmployee: permanentEmployee
    };

    fetch('http://localhost:8080/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Employee added:', data);
        clearForm(); // Clear the form after adding
        loadEmployees(); // Reload the employee list
    });
}

function editEmployee(employee) {
    document.getElementById('employeeId').value = employee.employeeId;
    document.getElementById('employeeName').value = employee.employeeName;
    document.getElementById('age').value = employee.age;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('department').value = employee.department;
    document.getElementById('permanent').checked = employee.permanentEmployee;

    document.getElementById('saveButton').textContent = 'Update Employee';
}

function updateEmployee() {

    const employeeId =
        document.getElementById('employeeId').value;

    const employeeName =
        document.getElementById('employeeName').value;

    const age =
        document.getElementById('age').value;

    const salary =
        document.getElementById('salary').value;

    const department =
        document.getElementById('department').value;

    const permanentEmployee =
        document.getElementById('permanent').checked;


    const employee = {

        employeeName: employeeName,

        age: parseInt(age),

        salary: parseFloat(salary),

        department: department,

        permanentEmployee: permanentEmployee
    };


    fetch(
        'http://localhost:8080/employees/' + employeeId,
        {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(employee)

        })

    .then(response => response.json())

    .then(data => {

        console.log('Employee updated:', data);

        clearForm();

        loadEmployees();

    });
}

    function saveEmployee(){
        const employeeId = document.getElementById('employeeId').value;

        if(employeeId===""){
            addEmployee();
        } else {
            updateEmployee();
        }
    }

function deleteEmployee(employeeId) {

    fetch(
        'http://localhost:8080/employees/' + employeeId,
        {
            method: 'DELETE'
        }
    )

    .then(response => {

        console.log(
            'Employee deleted: ' + employeeId
        );

        loadEmployees();

    });
}
 function clearForm() {

    document.getElementById('employeeId').value = '';

    document.getElementById('employeeName').value = '';

    document.getElementById('age').value = '';

    document.getElementById('salary').value = '';

    document.getElementById('department').value = '';

    document.getElementById('permanent').checked = false;


    // Change button back to Add
    document.getElementById("saveButton").textContent =
        "Add Employee";
}