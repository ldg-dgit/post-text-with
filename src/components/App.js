import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebase_im";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <br />
      <footer>&copy; {new Date().getFullYear()} DGit</footer>
    </>
  );
}

export default App;
