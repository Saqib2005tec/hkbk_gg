// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmployeeLedger {
    // This defines what an Employee record looks like
    struct Employee {
        string name;
        string role;
        string status;
    }

    // This creates the database mapping an ID number to the Employee
    mapping(uint256 => Employee) public employees;

    // Function to add or update an employee
    function setEmployee(uint256 _id, string memory _name, string memory _role, string memory _status) public {
        employees[_id] = Employee(_name, _role, _status);
    }

    // Function to read an employee's data
    function getEmployee(uint256 _id) public view returns (string memory, string memory, string memory) {
        Employee memory emp = employees[_id];
        return (emp.name, emp.role, emp.status);
    }
}