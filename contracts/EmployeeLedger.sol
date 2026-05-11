// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmployeeLedger {
    struct Employee {
        string name;
        string role;
        string status;
    }

    struct Onboarding {
        string stage;
        string status;
        uint256 updatedAt;
    }

    struct Attendance {
        string date;
        string status;
        uint256 markedAt;
    }

    struct Payroll {
        string month;
        uint256 amount;
        string currency;
        string status;
        uint256 updatedAt;
    }

    mapping(uint256 => Employee) public employees;
    mapping(uint256 => Onboarding) public onboardingRecords;
    mapping(uint256 => mapping(string => Attendance)) public attendanceRecords;
    mapping(uint256 => mapping(string => Payroll)) public payrollRecords;

    event EmployeeUpdated(uint256 indexed id, string name, string role, string status);
    event OnboardingUpdated(uint256 indexed id, string stage, string status);
    event AttendanceMarked(uint256 indexed id, string date, string status);
    event PayrollUpdated(uint256 indexed id, string month, uint256 amount, string currency, string status);

    function setEmployee(uint256 _id, string memory _name, string memory _role, string memory _status) public {
        employees[_id] = Employee(_name, _role, _status);
        emit EmployeeUpdated(_id, _name, _role, _status);
    }

    function getEmployee(uint256 _id) public view returns (string memory, string memory, string memory) {
        Employee memory emp = employees[_id];
        return (emp.name, emp.role, emp.status);
    }

    function setOnboarding(uint256 _id, string memory _stage, string memory _status) public {
        onboardingRecords[_id] = Onboarding(_stage, _status, block.timestamp);
        emit OnboardingUpdated(_id, _stage, _status);
    }

    function getOnboarding(uint256 _id) public view returns (string memory, string memory, uint256) {
        Onboarding memory record = onboardingRecords[_id];
        return (record.stage, record.status, record.updatedAt);
    }

    function markAttendance(uint256 _id, string memory _date, string memory _status) public {
        attendanceRecords[_id][_date] = Attendance(_date, _status, block.timestamp);
        emit AttendanceMarked(_id, _date, _status);
    }

    function getAttendance(uint256 _id, string memory _date) public view returns (string memory, string memory, uint256) {
        Attendance memory record = attendanceRecords[_id][_date];
        return (record.date, record.status, record.markedAt);
    }

    function setPayroll(
        uint256 _id,
        string memory _month,
        uint256 _amount,
        string memory _currency,
        string memory _status
    ) public {
        payrollRecords[_id][_month] = Payroll(_month, _amount, _currency, _status, block.timestamp);
        emit PayrollUpdated(_id, _month, _amount, _currency, _status);
    }

    function getPayroll(uint256 _id, string memory _month)
        public
        view
        returns (string memory, uint256, string memory, string memory, uint256)
    {
        Payroll memory record = payrollRecords[_id][_month];
        return (record.month, record.amount, record.currency, record.status, record.updatedAt);
    }
}
