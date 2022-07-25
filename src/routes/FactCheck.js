import { Link } from "react-router-dom";
import styled from "styled-components";

const FactCheckContainer = styled.div `
    form {
        cursor: pointer;
        margin-bottom: 0.8rem;
        background-color: #f5f5f5;
        color: black;
        padding: 1rem 1rem 1rem 1rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        :active {
                background-color: #ADB5C9;;
            }
        button {
            font-size: 1rem;
            font-weight: 600;
            border: 0px;
        }
    }
`

function FactCheck({input, factButton, setFactButton}) {
    const facts = [{
        id : 1,
        title : '재앙화',
        describtion: '난 거지가 될 거야'
    }, {
        id : 2,
        title : '독심술',
        describtion: '그 사람은 나를 싫어해'
    }, {
        id : 3,
        title : '일반화',
        describtion: '난 항상 이런 식이야'
    }, {
        id : 4,
        title : '흑백논리',
        describtion: '1등이 아니니 나는 바보야'
    }, {
        id : 5,
        title : '과장 또는 축소',
        describtion: '내가 다 망친 거야'
    } , {
        id : 6,
        title : '감정적 추론',
        describtion: '기분이 나쁘니 뭔가 잘못됐어'
    }]
    const handleButtonClick = (event) => {
        event.preventDefault();
        console.log(event.target.name)
        const clickedButton = event.target.name;
        if (factButton.includes(clickedButton)) {
            const factArr = factButton.filter((fact) => fact !== clickedButton)
            setFactButton(factArr)
        } else {
        setFactButton([...factButton, clickedButton])
        }
    }

    return (
        <FactCheckContainer>
            <main className="factcheck_container">
                <header>
                    <h1>생각 검토하기🔍</h1>
                    <p>내 생각의 왜곡된 부분을 찾아보세요.</p>
                </header>
                <section>
                    <h3>지금 나의 생각</h3>
                    <p className="input">{input}</p>
                </section>
                <section>
                    <h3>내 생각은 어떤 함정에 빠져있나요?</h3>
                    {facts.map((fact) => {
                        return (<form key={fact.id} name={fact.title} onClick={handleButtonClick}><button>{fact.title}</button>{fact.describtion}</form>)
                    })}
                </section>
                <footer>
                    <Link to="/fix"><button className="input_submit">선택 완료</button></Link>
                    <Link to="/"><button className="return_to_list">돌아가기</button></Link>
                </footer>
            </main>
        </FactCheckContainer>
    )
}

export default FactCheck;