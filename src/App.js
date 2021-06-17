import "./App.css";
import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Profiles from "./components/profile/Profiles";
import History from "./components/profile/History";
import Transaction from "./components/profile/Transaction";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <Switch>
            <Route exact path="/profile" component={Profiles}/>
            <Route exact path="/history" component={History}/>
            <Route exact path="/transaction" component={Transaction}/>
          </Switch>
          <Footer/>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
