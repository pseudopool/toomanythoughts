import React from "react";
import { Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "firebaseInstance";
import styled from "styled-components";

const FlowContainer = styled.div`
    .fact_result {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 250px;
    }
    li {
        height: 25px;
        width: 73px;
        text-align: center;
        list-style: none;
        display: block;
        padding: 0.5rem;
        border-radius: 1rem;
        margin: 0 0.3rem 1rem 0.3rem;
        background-color: white;
        color: #0C072F;
        font-size: 0.7rem;
        font-weight: 900;
    }
`

const Flow = ({input, fix, factButton, userObj}) => {

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "flow"), {
            input,
            fix,
            factButton,
            createdAt: new Date().toLocaleDateString(),
            creatorId: userObj.uid
        })
        window.location.replace('/list')
    }

    return (
        <FlowContainer>
        <main className="flow_container">
        <header>
            <h1>새로운 생각의 흐름 🐈</h1>
            <p>수정된 생각을 확인하고</p>
            <p>생각의 덫에서 가뿐하게 빠져나오세요.</p>
        </header>
        <section>
            <h3>처음 나의 생각</h3>
            <p>{input}</p>
        </section>
        <section>
            <h3>이 생각은 <div  className="fact_result">{factButton.map((fact, index) => {
                return (<li key={index}>{fact}</li>)
            })}</div>의 오류를 가지고 있었습니다.
            </h3>
        </section>
        <section>
            <p>{fix}</p>
            <h3>명료하게 수정된 오늘의 생각을 기록하세요.</h3>
        </section>
        <footer>
            <form onSubmit={handleOnSubmit}><button className="input_submit">저장</button></form>
            <Link to="/fix"><button className="return_to_list">돌아가기</button></Link>
        </footer>
    </main>
    </FlowContainer>
    )
} 
export default Flow;