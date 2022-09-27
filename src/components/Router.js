import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "../components/Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser, newName }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path='/' element={<Home userObj={userObj} />}></Route>
              <Route
                exact
                path='/profile'
                element={<Profile userObj={userObj} refreshUser={refreshUser} newName={newName} />}
              ></Route>
            </>
          ) : (
            <Route exact path='/' element={<Auth />}></Route>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
