import React from "react";
import HomePage from "./pages/Home";
import FaqPage from "./pages/Faq";
import ProfilePage from "./pages/Profile";
import ServicesPage from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetail";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import { Switch, Route } from "react-router-dom";
import ServiceCreate from "pages/services/ServiceCreate";
import UserServices from "components/service/UserServices";

function Routes() {
  return (
    <Switch>
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/services/new" component={ServiceCreate} />
      <Route excat path="/services/my" component={UserServices} />
      <Route exact path="/services/:serviceId">
        <ServiceDetailPage />
      </Route>

      <Route exact path="/services">
        <ServicesPage />
      </Route>
      <Route excat path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/faq">
        <FaqPage />
      </Route>
      <Route excat path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default Routes;
