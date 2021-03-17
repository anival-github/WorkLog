function detectWorkScheduleViolation(employeeId, presenceIntervals) {

  let violationTimesId = [];

  const employeeLeavesTime = presenceIntervals.reduce((acc, curr) => {
    const { employee_id, id, to } = curr;

    if (employee_id === employeeId) {
      acc.push({ id, to });
    }
    return acc;
  }, []);

  employeeLeavesTime.forEach((leaveTime) => {
    const leaveTimeInMs = new Date(leaveTime.to).getTime();
    let employeesAtWork = 0;

    presenceIntervals.forEach((presenceInterval) => {
      if (presenceInterval.employee_id === employeeId) {
        console.log("skip");
        return;
      }

      const fromInMs = new Date(presenceInterval.from).getTime();
      const toInMs = new Date(presenceInterval.to).getTime();

      if (leaveTimeInMs >= fromInMs && leaveTimeInMs <= toInMs) {
        employeesAtWork += 1;
      }
    });

    if (employeesAtWork <= 3) {
      violationTimesId.push(leaveTime.id);
    }
  });

  return violationTimesId;
}

export default detectWorkScheduleViolation;
