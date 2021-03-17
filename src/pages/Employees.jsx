import React from "react";

import EmployeesTable from "../components/employees/EmployeesTable";
import EmployeesTableItem from "../components/employees/EmpoyeesTableItem";

export default function Employees({ employees }) {
  return (
    <main className="mdc-top-app-bar--fixed-adjust">
      <EmployeesTable>
        {employees.map((employee) => (
          <EmployeesTableItem key={employee.id} employee={employee} />
        ))}
      </EmployeesTable>
    </main>
  );
}
