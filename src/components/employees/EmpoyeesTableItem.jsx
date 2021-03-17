import React from "react";
import { NavLink } from "react-router-dom";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function EmployeesTableItem({ employee }) {
  const { id, lastName, firstName, middleName, birthDate } = employee;

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="center">
        <NavLink to={`/worklog/${id}`}>
          {`${lastName} ${firstName} ${middleName}`}
        </NavLink>
      </TableCell>
      <TableCell align="center">{birthDate}</TableCell>
    </TableRow>
  );
}
