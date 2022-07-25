import Router from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "firebaseInstance";
import Home from "./Home";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      } setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <Router isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn} userObj={userObj}/> : <Home />}
    </>
  );
}

export default App;
