import React from "react";
import { Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "firebaseInstance";

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
        <main className="flow_container">
        <header>
            <h1>새로운 생각의 흐름 🐈</h1>
            <p>수정된 생각을 확인하고 생각의 덫에서 가뿐하게 빠져나오세요.</p>
        </header>
        <section>
            <h3>처음 나의 생각</h3>
            <p>{input}</p>
        </section>
        <section>
            <h3>이 생각은 {factButton.map((fact, index) => {
                return (<p key={index}>{fact}</p>)
            })}의 오류를 가지고 있었습니다.
            </h3>
        </section>
        <section>
            {fix}
            <h3>명료하게 수정된 오늘의 생각을 기록하세요.</h3>
        </section>
        <footer>
            <form onSubmit={handleOnSubmit}><button className="input_submit">저장</button></form>
            <Link to="/fix"><button className="return_to_list">돌아가기</button></Link>
        </footer>
    </main>
    )
} 
export default Flow;