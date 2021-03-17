import { Paper, Tab, Tabs } from '@material-ui/core';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ currentEmployeeName, currentEmployeeId }) => {
  const name = currentEmployeeName ? currentEmployeeName : 'ИМЯ СОТРУДНИКА';
  const workLogPath = `/worklog/${currentEmployeeId ? currentEmployeeId : ''}`

  const [tabValue, setTabValue] = React.useState(
    currentEmployeeName ? currentEmployeeName : "Список сотрудников"
  );

  useEffect(() => {
    if (currentEmployeeName) {
      setTabValue(currentEmployeeName);
    }
  }, [currentEmployeeName])

  const onChangeHandler = (e, newValue) => setTabValue(newValue)

  return (
    <Paper>
      <Tabs
        centered
        value={tabValue}
        onChange={onChangeHandler}
      >
        <Tab
          value="Список сотрудников"
          label="Список сотрудников"
          component={NavLink} to="/"
        />
        <Tab
          value={name}
          label={name}
          component={NavLink} to={workLogPath}
        />
      </Tabs>
    </Paper>
  )
};

export default Header;
