import react, { useEffect, useState } from "react";

const AuthContext = react.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');
    const[token,setToken]=useState(initialToken)
    const userIsLoggedIn= !!token;
    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem('token',token);
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        if(token){
          localStorage.removeItem('token');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }, [token]);
   
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue={
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler

    }
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
