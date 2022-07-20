import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService, dbService } from "firebaseInstance";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const List = ({setIsLoggedIn}) => {
    const [flows, setFlows] = useState([]);

        const onLogOutClick = () => {
            signOut(authService);
            setIsLoggedIn(false);
        }

        useEffect(() => {
            const q = query(collection(dbService, "flow"), orderBy('createdAt', "desc"))
            onSnapshot(q, (snapshot) => {
                const flowArr = snapshot.docs.map((flow) => ({
                    id: flow.id,
                    ...flow.data(),
                }))
                console.log(flowArr)
                setFlows(flowArr)
            })
        }, [])

    return (
            <main className="list_container">
                <header>
                    <h1>내 생각 목록📂</h1>
                    <hr />
                </header>
                <section>
                    <h3>오늘</h3>
                    {flows.map((flow) => {
                        return (
                            <li key={flow.id}>
                                {flow.fix}
                            </li>
                        )
                    })}
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