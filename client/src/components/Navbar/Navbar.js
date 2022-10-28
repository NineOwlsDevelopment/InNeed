import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/context";
import "./Navbar.css";

export default function Navbar() {
  const { user, setUser, socket } = useContext(AppContext);

  useEffect(() => {
    if (!socket.readyState) return;
  }, [socket]);

  const handleButton = () => {
    socket.send(JSON.stringify({ endpoint: "/api/test", data: 1234 }));
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="brand">inNeed</div>
      </div>
      <div className="nav-center">
        <button onClick={() => handleButton()}>Click</button>
      </div>
      <div className="nav-right"></div>
    </div>
  );
}
