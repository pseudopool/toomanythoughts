import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion';

const FixContainer = styled.div`
    div.fact_result {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 250px;
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
    }
`;

function Fix({factButton, input, fix, setFix}) {
    const handleFixChnage = (event) => {
        setFix(event.target.value)
        console.log(fix)
    }
    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
        <FixContainer>
        <main className="fix_container">
        <header>
            <h1>인지 왜곡 걷어내기💨</h1>
            <p>인지 왜곡을 걷어내고</p>
            <p>상황을 있는 그대로 바라보세요.</p>
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
            <Link to="/toomanythoughts/flow"><button className="input_submit">입력 완료</button></Link>
            <Link to="/toomanythoughts/factcheck"><button className="return_to_list">돌아가기</button></Link>
        </footer>
    </main>
    </FixContainer>
    </motion.div>
    )
}

export default Fix;