import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar/Navbar";
import Intro from "./Screens/Intro/Intro";
import Signup from "./Screens/Signup/Signup";
import Signin from "./Screens/Signin/Signin";

function App() {
    return (
        <>
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path = "/" exact = {true}>
                    <Intro/>
                </Route>
                <Route path = "/signup" exact = {true}>
                    <Signup/>
                </Route>
                <Route path = "/signin" exact = {true}>
                    <Signin/>
                </Route>
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;
