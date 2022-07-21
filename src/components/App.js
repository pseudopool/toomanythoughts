import Router from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "firebaseInstance";
import Home from "./Home";
import styled from "styled-components";

const AppContainer = styled.div`
  background-color: #0c072f;
  color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
`

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
    <><AppContainer>
      {init ? <Router isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn} userObj={userObj}/> : <Home />}
      <footer>&copy; {new Date().getFullYear()} toomanythoughts.</footer>   
      </AppContainer>
    </>
  );
}

export default App;
