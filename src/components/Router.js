import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import List from "routes/List";
import Input from "routes/Input";
import FactCheck from "routes/FactCheck";
import Fix from "routes/Fix";
import Flow from "routes/Flow";

const Router = ({isLoggedin, setIsLoggedIn}) => {
    const [input, setInput] = useState('')
    const [factButton, setFactButton] = useState([])
    const [fix, setFix] = useState('')
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedin ? 
                <>
                <Route path="/" element={<Input input={input} setInput={setInput}/>} />
                <Route path="/factcheck" element={<FactCheck input={input} factButton={factButton} setFactButton={setFactButton}/>} />
                <Route path="/fix" element={<Fix input={input} factButton={factButton} fix={fix} setFix={setFix}/>} />
                <Route path="/flow" element={<Flow input={input} fix={fix} factButton={factButton}/>} />
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