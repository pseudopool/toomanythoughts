import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing : border-box;
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #0c072f;
    color: white;
    left: 50%;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
    header {
        margin-bottom: 1.3rem;
        h1 {
        font-size: 1.8rem;
        font-weight: 700;
        padding-bottom: 1.3rem;
        }
        p {
        color: #C0C0C0;
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.3rem;
        }
        .logo {
            font-family: 'Baloo Tamma 2', cursive;
            font-weight: 800;
        }
    }
    textarea {
        width: 250px;
        height: 150px;
        border-radius: 1rem;
        border: 0px;
        padding: 1rem;
        margin-bottom: 1.5rem;
    }
    section {
        h3 {
            margin-bottom: 1.3rem;
        }
        p {
        background-color: #ADB5C9;
        color: black;
        font-weight: 600;
        width: 250px;
        height: 150px;
        border-radius: 1rem;
        border: 0px;
        padding: 1rem;
        margin-bottom: 1.5rem;
        }
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
                transform: scale(97%);
            }
        }
        button.return_to_list {
            background-color: #0C072F;
            color: white;
            border: 1.5px dotted white;
            margin-bottom: 1rem;
            :active {
                background-color: white;
                color: #0C072F;
                transform: scale(97%);
            }
        }
        
    }
  }
`

export default GlobalStyle;