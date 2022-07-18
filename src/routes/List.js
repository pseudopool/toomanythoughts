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
            <main className="list_container">
                <header>
                    <h1>내 생각 목록📂</h1>
                    <hr />
                </header>
                <section>
                    <h3>오늘</h3>
                </section>
                <section>
                    <h3>과거</h3>
                </section>
                <footer>
                    <Link to="/"><button onClick={onLogOutClick}>Log Out</button></Link>
                </footer>
            </main>
    )
}
export default List;