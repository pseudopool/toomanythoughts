import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Nav from "components/Nav";
import List from "routes/List";

const Router = ({isLoggedin, setIsLoggedIn}) => {
    return (
        <BrowserRouter>
            {isLoggedin && <Nav />}
            <Routes>
                {isLoggedin ? 
                <>
                <Route path="/" element={<Home/>} />
                <Route path="/list" element={<List setIsLoggedIn={setIsLoggedIn} />} />
                </> :
                <>
                <Route path="/" element={<Auth />} />
                </>
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router;