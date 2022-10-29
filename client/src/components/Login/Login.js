import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/context";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const { user, setUser, socket } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginUpdate = (e) => {
    const { name, value } = e.target;
    setLoginData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmitButton = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, loginData, {
        withCredentials: true,
      })
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
        <h1>Login</h1>

        <div className="text-input">
          <input
            value={loginData.email}
            onChange={handleLoginUpdate}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="text-input">
          <input
            value={loginData.password}
            onChange={handleLoginUpdate}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div>
          <span className="error">{error}</span>
        </div>

        <div className="submit-div">
          <button onClick={handleSubmitButton} className="login-button">
            Login
          </button>
        </div>

        <div className="is-not">
          <Link to={"/register"}>
            <span className="already-have">Don't have an account yet?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
