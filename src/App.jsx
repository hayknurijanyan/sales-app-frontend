import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import { getUserData } from "./utils/localStorage";

const PrivateRoute = ({ element: Element, loggedInUser, ...rest }) => {
  return loggedInUser ? (
    <Element loggedInUser={loggedInUser} {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(getUserData());

  return (
    <Router>
      <Navigation
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={
                loggedInUser?.role === "ADMIN"
                  ? AdminDashboard
                  : EmployeeDashboard
              }
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <Registration
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
