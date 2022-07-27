import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import List from "routes/List";
import Input from "routes/Input";
import FactCheck from "routes/FactCheck";
import Fix from "routes/Fix";
import Flow from "routes/Flow";
import { AnimatePresence } from "framer-motion";

const Router = ({isLoggedin, setIsLoggedIn, userObj}) => {
    const [input, setInput] = useState('')
    const [factButton, setFactButton] = useState([])
    const [fix, setFix] = useState('')
    return (
        <BrowserRouter>
        <AnimatePresence>
        <Routes>
                    {isLoggedin ? 
                        <>
                        <Route path="/toomanythoughts" element={<Input input={input} setInput={setInput}/>} />
                        <Route path="/toomanythoughts/factcheck" element={<FactCheck input={input} factButton={factButton} setFactButton={setFactButton}/>} />
                        <Route path="/toomanythoughts/fix" element={<Fix input={input} factButton={factButton} fix={fix} setFix={setFix}/>} />
                        <Route path="/toomanythoughts/flow" element={<Flow input={input} fix={fix} factButton={factButton} userObj={userObj}/>} />
                        <Route path="/toomanythoughts/list" element={<List setIsLoggedIn={setIsLoggedIn} userObj={userObj}/>} />
                        </> :
                        <>
                        <Route path="/toomanythoughts" element={<Auth />} />
                        </>
                        }
        </Routes>
        </AnimatePresence>
        </BrowserRouter>
    )
}

export default Router;