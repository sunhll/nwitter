import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/navigation";

//App.jsからcallされるApp.jsのログイン情報で遷移先を区別する
const AppRouter = ({ propIsLoggedIn, propUserObj }) => {
    return (
        <Router>
            {propIsLoggedIn && <Navigation />}
            <Switch>
                {propIsLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={propUserObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;