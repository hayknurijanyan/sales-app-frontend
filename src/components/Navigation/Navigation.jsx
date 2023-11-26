import { Link } from "react-router-dom";
import { clearUserData } from "../../utils/localStorage";
import "./styles.css";

const Navigation = ({ loggedInUser, setLoggedInUser }) => {
  return (
    <nav className="navbar">
      <Link className="home-button" to="/">
        Home
      </Link>
      <ul className="nav-links">
        {loggedInUser ? (
          <>
            <li>
              <span className="nav-links-role">{loggedInUser.role}</span>
            </li>
            <li>
              <Link
                onClick={() => {
                  clearUserData();
                  setLoggedInUser(null);
                }}
                to="/login"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
