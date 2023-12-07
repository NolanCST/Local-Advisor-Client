import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../src/Register/Register.jsx";
import Login from "../src/Login/Login.jsx";
// import Home from "./components/home/Home";

const App = () => {
    return (
        <Router>
            <Switch>
                {/* Route pour la page d'inscription */}
                <Route path="/Register">
                    <Register />
                </Route>

                {/* Route pour la page de connexion */}
                <Route path="/Login">
                    <Login />
                </Route>

                {/* Route pour la page d'accueil */}
                {/* <Route exact path="/">
                    <Home />
                </Route> */}

                {/* Route par défaut (page 404) */}
                <Route>
                    <p>Page non trouvée</p>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
