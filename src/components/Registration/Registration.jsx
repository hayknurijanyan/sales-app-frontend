import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../../constants/auth";
import { addDataToLocalStorage } from "../../utils/localStorage";
import userService from "../../api/userService";
import "./styles.css";

const Registration = ({ setLoggedInUser }) => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.register(formData);
      if (response.status === 201) {
        addDataToLocalStorage("user", formData);
        setLoggedInUser(formData);
        navigateTo("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Page</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
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
          placeholder="Password"
        />
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="">Select Role</option>
          <option value={ROLE_ADMIN}>Administrator</option>
          <option value={ROLE_EMPLOYEE}>Employee</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
