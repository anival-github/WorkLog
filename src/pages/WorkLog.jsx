import React, { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

import detectWorkScheduleViolation from "../helpers/detectWorkScheduleViolation";

import WorkLogTable from "../components/work-log/WorkLogTable";
import WorkLogTableItem from "../components/work-log/WorkLogTableItem";

export default function Worklog({ worklog, setCurrentEmployeeId }) {
  const { id } = useParams();
  const idFromURL = Number(id);

  const violarionsLogsId = useMemo(
    () => detectWorkScheduleViolation(idFromURL, worklog),
    [idFromURL, worklog]
  );

  useEffect(() => {
    setCurrentEmployeeId(idFromURL);
  }, []);

  const employeesWorkLog = worklog
    .filter(({ employee_id }) => idFromURL === employee_id)
    .map(({ id, from, to }) => {
      const isViolated = violarionsLogsId.includes(id);
      return (
        <WorkLogTableItem
          key={id}
          entranceTime={from}
          exitTime={to}
          isViolated={isViolated}
        />
      );
    });

  return (
    <main className="mdc-top-app-bar--fixed-adjust">
      <WorkLogTable>{employeesWorkLog}</WorkLogTable>
    </main>
  );
}
