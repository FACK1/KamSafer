import React, { Component } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Cars from "./components/Cars";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Confirm from "./components/Confirm";
import Calendar from "./components/Calendar";
import Reports from "./components/Reports";
import Add from "./components/Add";
import { addHelper } from "./utils/addHelper.js";
import { getData } from "./utils/getData";
import { BrowserRouter, Route } from "react-router-dom";
import "typeface-roboto";
import { getData } from "./utils/getData";

class App extends Component {
  state = {
    carId: 1,
    purpose: "Personal",
    driver_name: null,
    start_km: null,
    end_km: null,
    total: null,
    note: null,
    failed:false,
    carsData : null,
    reportData: null,
    carLogs: null  };

  getcars = () => {
    getData("/cars").then(carsData => {
      this.setState({ carsData });
    });
  };

  getlastkm =()=>{
    fetch("/getstartkm/"+this.state.carId).then(response=>{
      return response.json()
    }).then(result=>{
      this.setState({start_km:result[0].last_log_km})
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  submit = (events) => {
    const { history } = this.props;
    const { purpose, start_km, end_km, driver_name, note} = this.state;
    events.preventDefault();
    addHelper({ purpose, start_km, end_km, driver_name, note })
      .then(result => {
        if (result.logged) {
          history.push("/add");
        } else {
          this.setState({
            failed: true
          });
        }
      })
      .catch(error => {
        console.log(error);
        console.log("An error has occurred please try again");
      });
      events.preventDefault();
  }

  selectCar = (e, history) => {
    const chosen = this.state.carsData.filter(ele => {
      return ele.car_id === e;
    });
    this.setState({ carId: chosen }, () => {
      history.push("/home");
    });
  };
  
  getLogs = () => {
    getData("/logs").then(carLogs => {
      this.setState({ carLogs });
    });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route  path="/" component={Header} />
          <Route
            exact
            path="/cars"
            render={props => (
              <Cars {...props} data={this.state.carsData} getcars={this.getcars} handler={this.selectCar} />
            )}
          />
          <Route
            exact
            path="/reports"
            render={props => (
              <Reports
                data={this.state.carLogs}
                getLogs={this.getLogs}
                {...props}
              />
            )}
          />
          <Route exact path="/" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={Footer} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/clender" component={Calendar} />
          <Route
            exact
            path="/add"
            render={() => (
              <Add
                end_km={this.state.end_km}
                start_km={this.state.start_km}
                total={this.state.total}
                driver_name={this.state.driver_name}
                note={this.state.note}
                purpose={this.state.purpose}
                handleChange={this.handleChange}
                submit={this.submit}
                getlastkm={this.getlastkm}
              />
            )}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
