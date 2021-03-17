import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function WorkLogTableItem({
  entranceTime,
  exitTime,
  isViolated,
}) {
  return (
    <TableRow>
      <TableCell align="center">{entranceTime}</TableCell>
      <TableCell style={isViolated ? { color: "red" } : {}} align="center">
        {exitTime}
      </TableCell>
    </TableRow>
  );
}
