import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Common/Navbar/Navbar";
import Intro from "./Screens/Intro/Intro";
import Signin from "./Screens/Signin/Signin";
import Authentication from "./Screens/Authentication/Authentication";

const isAuth = true;
function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path="/" exact={true}>
                        <Intro />
                    </Route>
                    <GuestRoute path="/authentication" exact={true}>
                        <Authentication />
                    </GuestRoute>
                    <Route path="/signin" exact={true}>
                        <Signin />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: "/rooms",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};
export default App;
