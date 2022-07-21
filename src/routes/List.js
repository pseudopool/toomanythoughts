import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService, dbService } from "firebaseInstance";
import { collection, query, onSnapshot, where, deleteDoc, doc } from "firebase/firestore";

const List = ({setIsLoggedIn, userObj}) => {
    const [flows, setFlows] = useState([]);
    const [isClicked, setIsClikced] = useState(false);
    const [clickedFlow, setClickedFlow] = useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setIsClikced(true);
        setClickedFlow(event.target.name);
    }

    const onLogOutClick = () => {
            signOut(authService);
            setIsLoggedIn(false);
    }

    const onCloseClick = () => {
            setIsClikced(false)
    }

    const Overlay = ({flows, clickedFlow}) => {
        const onDeleteClick = async () => {
            setIsClikced(false)
            const flowRef = doc(dbService, "flow", clickedFlow)
            await deleteDoc(flowRef)
        }
            return (
                <div>
                    {flows.map((flow) => {
                        if (flow.id === clickedFlow) {
                            return (
                                <div key={flow.id}>
                                    <h4>
                                        인지 왜곡 교정 후 : {flow.fix}
                                    </h4>
                                    <p>
                                        인지 왜곡 교정 전 : {flow.input}
                                    </p>
                                    <p>
                                        내 생각의 함정 : {flow.factButton.map((fact) => {
                                            return <span>{fact} </span>
                                        })}
                                    </p>
                                    <button onClick={onDeleteClick} >
                                        지우기
                                    </button>
                                </div>
                            )
                        }
                    })}
                    <button onClick={onCloseClick}>닫기</button>
                </div>
            )
        }

        useEffect(() => {
            const q = query(collection(dbService, "flow"), where("creatorId", "==", userObj.uid))
            onSnapshot(q, (snapshot) => {
                const flowArr = snapshot.docs.map((flow) => ({
                    ...flow.data(),
                    id: flow.id,
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
                        if(flow.createdAt === new Date().toLocaleDateString()) {
                        return (
                            <form key={flow.id} name={flow.id} onSubmit={handleOnSubmit}>
                                <button>
                                    오늘의 고민
                                </button>
                            </form>
                        )
                        } else {
                            return (
                                <p>
                                    오늘의 고민은 없습니다.
                                </p>
                            )
                        }
                    })}
                </section>
                <section>
                    <h3>과거</h3>
                    {flows.map((flow) => {
                        if(flow.createdAt !== new Date().toLocaleDateString()) {
                        return (
                            <form key={flow.id} name={flow.id} onSubmit={handleOnSubmit}>
                                <button>
                                    {flow.createdAt}
                                </button>
                            </form>
                        )
                        }
                    })}
                </section>
                {isClicked && <Overlay flows={flows} clickedFlow={clickedFlow}/>}
                <footer>
                    <Link to="/"><button className="return_to_list">+</button></Link>
                    <Link to="/"><button onClick={onLogOutClick}>Log Out</button></Link>
                </footer>
            </main>
    )
}
export default List;