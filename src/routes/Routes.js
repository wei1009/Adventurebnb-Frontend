import React from "react";
import NavBar from "./NavBar";
import Home from "../Home/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import Hotels from "../Hotels/Hotels";
import HotelInfomation from "../Hotels/HotelInfomation";
import PlanList from "../Plan/PlanList";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// function Routes({ login, signup }) {
//     console.debug(
//         "Routes",
//         `login=${typeof login}`,
//         `register=${typeof register}`,
//     );
// }

function Routes({ login, signup }){
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
);

    return (
       <main>
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/hotel">
                <HotelInfomation />
              </Route>

              <Route exact path="/city">
                <Hotels />
              </Route>

              <Route exact path="/signup">
                <SignupForm signup={signup} />
              </Route>

              <Route exact path="/Login">
                <LoginForm login={login}/>
              </Route>

              <Route exact path="/myplan">
                <PlanList />
              </Route>

              <Route exact path="/profile">
                <ProfileForm />
              </Route>

              <Redirect to="/" />

            </Switch>
            </main>
      );
}

export default Routes;