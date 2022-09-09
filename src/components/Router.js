import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path='/' element={<Home />}></Route>
          </>
        ) : (
          <Route exact path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
