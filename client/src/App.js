import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Spinner from "./components/layout/Spinner";
import { authContext } from "./context/auth/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {

  const { authState: { authLoading, isAuthenticated } } = authContext();
  Spinner(authLoading)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {isAuthenticated ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {!isAuthenticated ? <Redirect to="/" /> : <Profile />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
