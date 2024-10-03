import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeList from "./Components/EmployeeList";
import Home from "./Components/Home";
import EditEmployee from "./Components/EditEmployee";

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="dark:bg-black min-h-screen">
      <Router>
        <Header username={username} setUsername={setUsername} />

        <Routes>
          <Route
            path="/login"
            element={
              username ? (
                <Navigate to="/" />
              ) : (
                <Login setUsername={setUsername} />
              )
            }
          />

          <Route
            path="/"
            element={
              username ? <Home username={username} /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/employees"
            element={username ? <EmployeeList /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-employee"
            element={username ? <EmployeeForm /> : <Navigate to="/login" />}
          />

          <Route
            path="/edit-employee/:id"
            element={username ? <EditEmployee /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={username ? <Navigate to="/" /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
