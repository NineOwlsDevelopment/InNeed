import React, { useState, useEffect } from "react";
import AppContext from "./context";

export default function AppState(props) {
  const [socket, setSocket] = useState({});
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    uuid: null,
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
