import { useNavigate } from "react-router-dom";
import "./styles.css";
import { IS_LOGGED_IN_USER } from "../../constants/auth";

const Home = () => {
  const navigateTo = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Sales App</h1>

      {IS_LOGGED_IN_USER ? (
        <>
          <p>
            You are already logged in, please click to Dashboard button to see
            your data
          </p>
          <button onClick={() => navigateTo("/dashboard")}>Dashboard</button>
        </>
      ) : (
        <>
          <p>
            If you have an account, please login. Otherwise, please register to
            start using the service.
          </p>
          <div>
            <button onClick={() => navigateTo("/login")}>Login</button>
            <button onClick={() => navigateTo("/registration")}>
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
