import { Link } from "react-router-dom";
import styled from "styled-components";

const InputContainer = styled.div `
    header {
        margin-bottom: 20px;
        h1 {
        font-size: 30px;
        font-weight: 700;
        padding-bottom: 1.5rem;
        }
        p {
        color: #C0C0C0;
        font-size: 15px;
        font-weight: 300;
        line-height: 1.3rem;
        }
    }
    textarea {
        width: 250px;
        height: 150px;
        border-radius: 1rem;
        border: 0px;
        box-shadow: 1px 1px 5px 2px lightgray;
        padding: 1rem;
        margin-bottom: 1.5rem;
    }
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        button {
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
        button.return_to_list {
            background-color: #0C072F;
            color: white;
            border: 0.1px dashed white;
            margin-bottom: 1rem;
        }
    }
`

const Input = ({input, setInput}) => {
    const handleInputChnage = (event) => {
        setInput(event.target.value)
        console.log(input)
    }

    return (
        <InputContainer>
            <main className="input_container">
                <header>
                    <h1>무슨 생각 중인가요?</h1>
                    <p>지금 나를 괴롭히는 생각을 입력하고 </p>
                    <p>생각의 덫을 발견해보세요.</p>
                </header>
                <section>
                    <textarea onChange={handleInputChnage} placeholder="시험을 망칠까봐 무서워요."/>
                </section>
                <footer>
                    <Link to="/factcheck"><button className="input_submit">입력 완료</button></Link>
                    <Link to="/list"><button className="return_to_list">리스트 보기</button></Link>
                </footer>
            </main>
        </InputContainer>
    )
}
export default Input;