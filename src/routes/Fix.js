import {Link} from 'react-router-dom'


function Fix({factButton, input, fix, setFix}) {
    const handleFixChnage = (event) => {
        setFix(event.target.value)
        console.log(fix)
    }
    return (
        <main className="fix_container">
        <header>
            <h1>인지 왜곡 걷어내기💨</h1>
            <p>인지 왜곡을 걷어내고 상황을 있는 그대로 바라보세요.</p>
        </header>
        <section>
            <h3>처음 나의 생각</h3>
            <p>{input}</p>
        </section>
        <section>
            <h3>이 생각의 인지 왜곡</h3>
            <div className='fact_result'>
            {factButton.map((fact, index) => {
                return <li key={index}>{fact}</li>
            })}
            </div>
        </section>
        <section>
            <h3>인지 왜곡이 없는 생각</h3>
                <textarea onChange={handleFixChnage} placeholder="사실만을 적어보세요."/>
        </section>
        <footer>
            <Link to="/flow"><button className="input_submit">입력 완료</button></Link>
            <Link to="/factcheck"><button className="return_to_list">돌아가기</button></Link>
        </footer>
    </main>
    )
}

export default Fix;