import React from "react";
import NavBar from "./NavBar";
import Home from "../Home/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import Hotels from "../Hotels/Hotels";
import HotelInfomation from "../Hotels/HotelInfomation";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// function Routes({ login, signup }) {
//     console.debug(
//         "Routes",
//         `login=${typeof login}`,
//         `register=${typeof register}`,
//     );
// }

function Routes({ login, signup }){
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
                <LoginForm />
              </Route>

              <Route exact path="/accommodationplan">
                <Home />
              </Route>

              <Route exact path="/profile">
                <Home />
              </Route>

              <Redirect to="/" />

            </Switch>
            </main>
      );
}

export default Routes;