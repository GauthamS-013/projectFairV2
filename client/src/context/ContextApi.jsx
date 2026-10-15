import React, { useState } from "react";
import { createContext } from "react";

export const addResponseContext = createContext();
export const editResponseContext = createContext();
export const authContext = createContext();

function ContextApi({ children }) {
  const [addresponse, setAddresponse] = useState("");
  const [editResponse, setEditResponse] = useState("");
  const [auth, setAuth] = useState(!!sessionStorage.getItem("token"));
  return (
    <>
      <addResponseContext.Provider value={{ addresponse, setAddresponse }}>
        <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
          <authContext.Provider value={{auth,setAuth}}>
            {children}
          </authContext.Provider>
        </editResponseContext.Provider>
      </addResponseContext.Provider>
    </>
  );
}

export default ContextApi;
