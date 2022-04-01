import React from "react";
import Home from "../Home/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import Hotels from "../Hotels/Hotels";
import HotelInfomation from "../Hotels/HotelInfomation";
import PlanList from "../Plan/PlanList";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import PrivateRoute from "./PrivateRoute";
import { Route, Switch, Redirect } from "react-router-dom";

function Routes({ login, signup }) {

  const options = {
    position: positions.TOP_CENTER,
    timeout: 2000,
    offset: '25px',
    transition: transitions.SCALE,
  }

  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );

  return (
    <main>
      <Switch>

        <Route exact path="/">
          <AlertProvider template={AlertTemplate} {...options}>
            <Home />
            </AlertProvider>
        </Route>

        <Route exact path="/hotel">
          <AlertProvider template={AlertTemplate} {...options}>
            <HotelInfomation />
          </AlertProvider>
        </Route>

        <Route exact path="/hotelsearch">
          <AlertProvider template={AlertTemplate} {...options}>
            <Hotels />
          </AlertProvider>
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/Login">
          <LoginForm login={login} />
        </Route>

        <PrivateRoute exact path="/myplan">
          <AlertProvider template={AlertTemplate} {...options}>
            <PlanList />
          </AlertProvider>
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Redirect to="/" />

      </Switch>
    </main>
  );
}

export default Routes;