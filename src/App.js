import React from "react";
import "./App.css";
import StickyHeadTable from "./components/table/TableView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import TableEdit from "./components/table/TableEdit";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/edit">
            <Header />
            <TableEdit />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Header />
            <StickyHeadTable />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
