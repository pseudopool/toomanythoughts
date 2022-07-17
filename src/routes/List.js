import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService } from "firebaseInstance";

const List = ({setIsLoggedIn}) => {
        const onLogOutClick = () => {
            signOut(authService);
            setIsLoggedIn(false);
        }
    return (
    <>
        <Link to="/"><button onClick={onLogOutClick}>Log Out</button></Link>
    </>
    )
}
export default List;