import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Beers from "./Beers.js";
import Login from "./Login.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {isLoggedIn && <Route path="/beers" element={<Beers />} />}
        </Routes>
        {isLoggedIn && <Navigate to="/beers" replace={true} />}
        {!isLoggedIn && <Navigate to="/" replace={true} />}
      </Router>
    </>
  );
};
export default App;
