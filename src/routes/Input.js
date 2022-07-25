import { Link } from "react-router-dom";

const Input = ({input, setInput}) => {
    const handleInputChange = (event) => {
        setInput(event.target.value)
        console.log(input)
    }

    return (
            <main className="input_container">
                <header>
                    <h1>무슨 생각 중인가요?</h1>
                    <p>지금 나를 괴롭히는 생각을 입력하고 </p>
                    <p>생각의 덫을 발견해보세요.</p>
                </header>
                <section>
                    <textarea onChange={handleInputChange} placeholder="시험을 망칠까봐 무서워요."/>
                </section>
                <footer>
                    <Link to ="/factcheck"><button className="input_submit">입력 완료</button></Link>
                    <Link to="/list"><button className="return_to_list">리스트 보기</button></Link>
                </footer>
            </main>
    )
}
export default Input;