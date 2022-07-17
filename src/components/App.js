import Router from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "firebaseInstance";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      } setInit(true)
    })
  }, [])
  return (
    <>
      {init ? <Router isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn}/> : "loading..."}
      <footer>&copy; {new Date().getFullYear()} toomanythoughts.</footer>    
    </>
  );
}

export default App;
