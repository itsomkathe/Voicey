import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Components/Common/Navbar/Navbar";
import Intro from "./Screens/Intro/Intro";
import Signin from "./Screens/Signin/Signin";
import Verification from "./Screens/Verification/Verification";
import Authentication from "./Screens/Authentication/Authentication";
import AddPhoto from "./Screens/Steps/AddPhoto/AddPhoto";
import { useRefreshLoader } from "./CustomHooks/useRefreshLoader";
import Rooms from "./Screens/Rooms/Rooms";
import SingleRoom from "./Screens/Single Room/SingleRoom";

function App() {
    const {loading} = useRefreshLoader();
    return loading ? (
        "Loading..."
    ):(
        <>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <GuestRoute path="/" exact={true}>
                        <Intro/>
                    </GuestRoute>
                    <GuestRoute path="/verification">
                        <Verification />
                    </GuestRoute>
                    <AuthenticationRoute path = "/authentication">
                        <Authentication/>
                    </AuthenticationRoute>
                    <ProtectedRoute path = "/rooms">
                        <Rooms/>
                    </ProtectedRoute>
                    <ProtectedRoute path = "/room/:roomId">
                        <SingleRoom/>
                    </ProtectedRoute>
                    <GuestRoute path="/signin">
                        <Signin />
                    </GuestRoute>
                    <ProtectedRoute path = "/addphoto">
                        <AddPhoto/>
                    </ProtectedRoute>
                </Switch>
            </BrowserRouter>
        </>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    const isAuth = useSelector((state)=>{return state.profile.isAuth});
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

const AuthenticationRoute = ({ children, ...rest }) => {
    const isVerified = useSelector((state)=>{return state.verify.isVerified});
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isVerified ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
            exact
        ></Route>
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    const isAuth = useSelector((state)=>{return state.profile.isAuth});
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
            exact
        ></Route>
    );
};


export default App;
