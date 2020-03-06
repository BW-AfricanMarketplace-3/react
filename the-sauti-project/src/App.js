import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./utils/";
import { alertInfo } from "./actions";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { Register } from "./Register";

import PriceList from "./components/PriceList" 
import ProductsList from "./components/ProductsList";
import NavBar from "./components/NavBar";



class App extends React.Component {
  constructor(props) {
    super(props)
    
    history.listen((location, action) => {
      this.props.clearAlerts()
    })
  }
  render() {

    const { alert } = this.props;
    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                       <NavBar />
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/product" component={ProductsList} />
                            <PrivateRoute exact path="/listings" component={PriceList} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={Register} />
                            <Redirect from="*" to="/register" component={Register} />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

}

                function mapState(state) {
                  const { alert } = state;
                  return { alert };
              }
              
              const actionCreators = {
                  clearAlerts: alertInfo.clear
              };
              
              const connectedApp = connect(mapState, actionCreators)(App);
              export { connectedApp as App };
  
