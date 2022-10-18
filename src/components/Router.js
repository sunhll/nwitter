import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/navigation";

//App.jsからcallされるApp.jsのログイン情報で遷移先を区別する
const AppRouter = ({ propIsLoggedIn, propUserObj, propRefreshUser }) => {
    return (
        <Router>
            {propIsLoggedIn && <Navigation userObj={propUserObj} />}
            <Switch>
                {propIsLoggedIn ? (
                    <div style={{ maxWidth: 890, width: "100%", margin: "0 auto", marginTop: 80, display: "flex", justifyContent: "center", }} >
                        <Route exact path="/">
                            <Home userObj={propUserObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={propUserObj} refreshUser={propRefreshUser} />
                        </Route>
                        <Redirect from="*" to="/" />
                    </div>
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