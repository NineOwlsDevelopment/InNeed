import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/context";
import "./Navbar.css";

export default function Navbar() {
  const { user, setUser, socket, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    if (!socket.readyState) return;
  }, [socket]);

  const handleButton = () => {
    socket.send(JSON.stringify({ endpoint: "/api/test", data: 1234 }));
  };

  const handleLogout = () => {
    setIsAuth({ type: "LOGOUT" });
    setUser({});
    console.log(user.isAuth);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="brand">
          <Link to={"/"}>inNeed</Link>
        </div>
      </div>
      <div className="nav-center"></div>

      {user.isAuth ? (
        <>
          <div className="nav-right">
            <div className="register">
              <Link to={"/login"}>
                <button onClick={() => handleLogout()}>LogOut</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="nav-right">
            <div className="login">
              <Link to={"/login"}>Log In</Link>
            </div>

            <div className="register">
              <Link to={"/register"}>
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
