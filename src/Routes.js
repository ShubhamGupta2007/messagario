import React from "react";
import HomePage from "./pages/Home";
import FaqPage from "./pages/Faq";
import ProfilePage from "./pages/Profile";
import ServicesPage from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetail";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import { Switch, Route } from "react-router-dom";
function Routes() {
  return (
    <Switch>
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="/services/:serviceId">
        <ServiceDetailPage />
      </Route>
      <Route path="/services">
        <ServicesPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/faq">
        <FaqPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default Routes;
