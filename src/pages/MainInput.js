import { InputForm } from "../components/InputForm";
import styled from "styled-components";

const Background = styled.div`
    display: flex;
    background-color: black;
`

export const MainInput = () => {
    return (
    <Background>
        <InputForm />
    </Background>
    )
}