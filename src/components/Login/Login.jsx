import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/userService";
import { addDataToLocalStorage } from "../../utils/localStorage";
import "./styles.css";

const Login = ({ setLoggedInUser }) => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(formData);
      if (response.status === 201) {
        addDataToLocalStorage("user", response.user);
        setLoggedInUser(response.user);
        navigateTo("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(
        "Login error: please your check username or password and try again."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
