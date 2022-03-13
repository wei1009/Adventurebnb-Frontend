import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes/NavBar";
import UserContext from "./auth/UserContext";
import HotelApi from "./api/api";
import Routes from "./routes/Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";
import jwt from "jsonwebtoken";
import './CSS/App.css';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
);

useEffect(function loadUserInfo() {
  console.debug("App useEffect loadUserInfo", "token=", token);

  async function getCurrentUser() {
    if (token) {
      try {
        let { username } = jwt.decode(token);
        // put the token on the Api class so it can use it to call the API.
        HotelApi.token = token;
        let currentUser = await HotelApi.getCurrentUser(username);
        setCurrentUser(currentUser);
        setApplicationIds(new Set(currentUser.applications));
      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        setCurrentUser(null);
      }
    }
    setInfoLoaded(true);
  }
  
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }


  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */


  async function signup(signupData) {
    try {
      let token = await HotelApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


 /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await HotelApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
    <UserContext.Provider
            value={{ currentUser, setCurrentUser}}>
    <div className="App">
      <NavBar logout={logout}/>
      <Routes  login={login} signup={signup} />
      </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
