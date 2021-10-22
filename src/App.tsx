import React from "react"
import "./App.css"
import Register from "./app/components/Register"
import Login from "./app/components/Login"
import { Router, Route, Switch } from "react-router-dom"
import UserTable from "./app/components/UserTable"
import history from "./history"
import UserRegister from "./app/components/UserRegister"
import UserLoggedDay from "./app/components/UserLoggedDay"

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/registro" exact={true} component={Register} />
          <Route path="/User" exact={true} component={UserTable} />
          <Route path="/logueos_dia" exact={true} component={UserLoggedDay} />
          <Route
            path="/usuarios_registrados"
            exact={true}
            component={UserRegister}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
