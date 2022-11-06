import React, { useReducer, useState, useEffect } from "react";
import AppContext from "./context";
import { userReducer, USER_STATE } from "./userReducer";

export default function AppState(props) {
  const [isAuth, setIsAuth] = useReducer(userReducer, USER_STATE);
  const [socket, setSocket] = useState({});
  const [user, setUser] = useState({
    isAuth: localStorage.getItem("isAuth"),
    firstName: "",
    lastName: "",
    email: "",
    uuid: "",
  });

  useEffect(() => {
    let ws = new WebSocket("ws://127.0.0.1:5000");
    ws.onopen = () => setSocket(ws);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        socket,
        isAuth,
        setIsAuth,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
