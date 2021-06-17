import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import ServiceApp from "./ServiceApp";
import { ToastProvider } from "react-toast-notifications";
import initStore from "./store";
import { Provider } from "react-redux";

import {
  onAuthStateChanged,
  storeAuthUser,
  resetAuthState,
} from "actions/index.js";

const store = initStore();

class App extends React.Component {
  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged((authUser) => {
      // debugger;
      store.dispatch(resetAuthState());
      store.dispatch(storeAuthUser(authUser));
    });
  }

  componentWillUnmount() {
    // debugger;
    this.unsubscribeAuth();
  }

  render() {
    return (
      <Provider store={store}>
        <ToastProvider>
          <Router>
            <ServiceApp />
          </Router>
        </ToastProvider>
      </Provider>
    );
  }
}

export default App;
