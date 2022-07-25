import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService, dbService } from "firebaseInstance";
import { motion } from "framer-motion";
import { collection, query, onSnapshot, where, deleteDoc, doc, orderBy } from "firebase/firestore";
import styled from "styled-components";

const ListContainer = styled.div`
    .lists {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form {
        button {
        width: 210px;
        border: 0;
        padding: 0.8rem;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        font-weight: 700;
        cursor: pointer;
        :hover {
            background-color: #ADB5C9;
        }
        }
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 4rem;
            .add{
            font-size: 2rem;
            padding: 0;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            font-weight: 500;
        }
            .logout{
                background-color: transparent;
                color: #ADB5C9;
                font-weight: 400;
            }
    }
`

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

    const OverlayWrapper = styled.div`
        position: absolute;
        background-color: white;
        color: black;
        padding: 5px;
        border-radius: 15px;
        width: 50%;
        height: auto;
        left: 25%;
        top: 8%;
        line-height: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 1px 1px 10px 1px lightgrey;
        h1 {
            font-weight: 900;
            font-size: 1.2rem;
            padding: 1rem;
        }
        button {
            float: inline-end;
            background-color: #0C072F;
            color: white;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            font-size: 0.8rem;
            font-weight: 600;
            width: 5rem;
            border-radius: 0.8rem;
            border: 0px;
            cursor: pointer;
            :active {
                background-color: #433886;
                color: white;
            }
        }
        .deleteButton {
            background-color: lightgray;
            margin-bottom: 1.5rem;
        }
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        section {
            width: 240px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-weight: 900;
            font-size: 1rem;
            span {
                display: inline-block;
                background-color: #0C072F;
                color: lightgrey;
                font-size: small;
                margin: 0.1rem;
                padding: 0 0.6rem 0 0.6rem;
                border-radius: 0.5rem;
            }
            li {
                list-style: none;
                margin-bottom: 1.5rem;
            }
            p {
                height: auto;
                padding: 0.5rem;
                padding-left: 1.5rem;
                font-size: 0.8rem;
            }
        }
    `

    const Overlay = ({flows, clickedFlow}) => {
        const onDeleteClick = async () => {
            setIsClikced(false)
            const flowRef = doc(dbService, "flow", clickedFlow)
            await deleteDoc(flowRef)
        }
            return (
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                >
                <OverlayWrapper>
                    {flows.map((flow) => {
                        if (flow.id === clickedFlow) {
                            return (
                                <div key={flow.id}>
                                    <h1>💬 {new Date(flow.createdAt).getMonth()+1}월 {new Date(flow.createdAt).getDate()+1}일의 고민</h1>
                                    <section  className="title">
                                        왜곡된 생각<p>{flow.input}</p>
                                    </section>
                                    <section  className="title">  내 생각의 함정
                                    <li>
                                    {flow.factButton.map((fact) => {
                                            return <span>{fact} </span>
                                        })}
                                    </li>
                                    </section>
                                    <section className="title">
                                        수정한 생각 
                                        <p>{flow.fix}</p>
                                    </section>
                                    <button onClick={onCloseClick}>닫기</button>
                                    <button className="deleteButton" onClick={onDeleteClick} >
                                        지우기
                                    </button>
                                </div>
                            )
                        }
                    })}
                </OverlayWrapper>
                </motion.div>
            )
        }

        useEffect(() => {
            const q = query(collection(dbService, "flow"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"))
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
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
        <ListContainer>
            <main className="list_container">
                <header>
                    <h1>내 생각 목록 📂</h1>
                </header>
                <section>
                    <h3>오늘</h3>
                    <div className="lists">
                    {flows.map((flow) => {
                        if(flow.createdAt === new Date().toLocaleDateString()) {
                        return (
                            <form key={flow.id} name={flow.id} onSubmit={handleOnSubmit}>
                                <button>
                                    💬 오늘의 고민
                                </button>
                            </form>
                        )
                        }
                    })}
                    </div>
                </section>
                <section>
                    <h3>과거</h3>
                    <div className="lists">
                    {flows.map((flow) => {
                        if(flow.createdAt !== new Date().toLocaleDateString()) {
                        return (
                            <form key={flow.id} name={flow.id} onSubmit={handleOnSubmit}>
                                <button>
                                💬 {new Date(flow.createdAt).getMonth()+1}월 {new Date(flow.createdAt).getDate()+1}일의 고민
                                </button>
                            </form>
                        )
                        }
                    })}
                    </div>
                </section>
                {isClicked && <Overlay flows={flows} clickedFlow={clickedFlow}/>}
                <footer>
                <Link to="/toomanythoughts"><button className="add">+</button></Link>
                <Link to="/toomanythoughts"><button className="logout" onClick={onLogOutClick}>Log Out</button></Link>
                </footer>
            </main>
        </ListContainer>
        </motion.div>
    )
}
export default List;