import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/Users";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Newpost from "./Components/Newpost/Newpost";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const { isAuthenticate } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticate && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticate ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticate ? <Account /> : <Login />}
        />
        <Route
          path="/newpost"
          element={isAuthenticate ? <Newpost /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticate ? <Account /> : <Register />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticate ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticate ? <UpdatePassword /> : <Login />}
        />
        <Route
          path="/forgot/password/"
          element={isAuthenticate ? <UpdatePassword /> : <ForgotPassword />}
        />
        <Route
          path="/password/reset/:token"
          element={isAuthenticate ? <UpdatePassword /> : <ResetPassword />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticate ? <UserProfile /> : <Login />}
        />
        <Route
          path="/search"
          element={isAuthenticate ? <Search /> : <Login />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
