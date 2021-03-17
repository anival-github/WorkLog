import React, { useEffect, useCallback, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { getEmployees, getWorklog } from "./api";
import { Container } from "@material-ui/core";

import Header from "./components/shared/Header";
import Employees from "./pages/Employees";
import WorkLog from "./pages/WorkLog";

const initialState = {
  loading: true,
  error: "",
  employees: [],
  worklog: [],
  currentEmployeeId: null,
  currentEmployeeName: null,
};

function appReducer(state, { type, payload }) {
  switch (type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        employees: payload.employees,
        worklog: payload.worklog,
      };
    case "FETCH_DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SET_CURREN_EMPLOYEE":
      const { lastName, firstName, middleName } = state.employees.find(
        (employee) => employee.id === payload
      );
      return {
        ...state,
        currentEmployeeId: payload,
        currentEmployeeName: `${lastName} ${firstName} ${middleName}`,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      const employees = await getEmployees();
      const worklog = await getWorklog();

      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: {
          employees,
          worklog,
        },
      });
    } catch (err) {
      dispatch({
        type: "FETCH_DATA_FAIL",
        error: err.toString(),
      });
    }
  }, []);

  const setCurrentEmployeeId = (id) => {
    dispatch({
      type: "SET_CURREN_EMPLOYEE",
      payload: id,
    });
  };

  const {
    employees,
    worklog,
    currentEmployeeName,
    currentEmployeeId,
    loading,
    error,
  } = state;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `${error} - Please try again!`;
  }

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Header
          currentEmployeeName={currentEmployeeName}
          currentEmployeeId={currentEmployeeId}
        />
        <Route exact path="/worklog/:id">
          <WorkLog
            worklog={worklog}
            setCurrentEmployeeId={setCurrentEmployeeId}
          />
        </Route>
        <Route exact path="/">
          <Employees employees={employees} />
        </Route>
      </Container>
    </BrowserRouter>
  );
}
