import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "../components/Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
          </>
        ) : (
          <Route exact path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
