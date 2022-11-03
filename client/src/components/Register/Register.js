import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/context";
import axios from "axios";

export default function Register() {
  const { user, setUser, socket } = useContext(AppContext);
  const [error, setError] = useState(null);

  const [registerData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleLoginUpdate = (e) => {
    const { name, value } = e.target;
    setLoginData((prevValue) => ({ ...prevValue, [name]: value }));
    setError(null);
  };

  const handleSubmitButton = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/register`,
        registerData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setError(e.response.data.error);
      });
  };

  return (
    <div className="auth-body">
      <div className="login-register">
        <h1>Sign Up</h1>

        <div className="text-input">
          <input
            value={registerData.email}
            onChange={handleLoginUpdate}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="text-input">
          <input
            value={registerData.password}
            onChange={handleLoginUpdate}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div className="text-input">
          <input
            value={registerData.confirmPassword}
            onChange={handleLoginUpdate}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </div>

        <div className="text-input">
          <input
            value={registerData.firstName}
            onChange={handleLoginUpdate}
            type="text"
            name="firstName"
            placeholder="First name"
          />
        </div>

        <div className="text-input">
          <input
            value={registerData.lastName}
            onChange={handleLoginUpdate}
            type="password"
            name="lastName"
            placeholder="Last name"
          />
        </div>

        <div>
          <span className="error">{error}</span>
        </div>

        <div className="submit-div">
          <button onClick={handleSubmitButton} className="login-button">
            Register
          </button>
        </div>

        <div className="is-not">
          <Link to={"/login"}>
            <span className="already-have">Already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
