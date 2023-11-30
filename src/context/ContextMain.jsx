import { createContext, useEffect, useState } from "react";
import { back } from "../const/urls";
import axios from "axios";

export const ContextMain = createContext();

export function ContextMainProvider(props) {
  const [auth, setAuth] = useState(!!sessionStorage.getItem("token"));
  const [level, setLevel] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setAuth(true);
      setLevel(sessionStorage.getItem("level"))
    } else {
      setAuth(false);
    }
  }, []);

  function isLogin() {
    setAuth(true);
    console.log(sessionStorage.getItem("level"))
    setLevel(sessionStorage.getItem("level"))
  }

  function isLogout() {
    setAuth(false);
    setLevel(0)
  }

  function formatDate(date) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false 
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  return (
    <ContextMain.Provider value={{ isLogin, isLogout, auth, setAuth, formatDate, level, setLevel }}>
      {props.children}
    </ContextMain.Provider>
  );
}
