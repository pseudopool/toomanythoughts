import styled from "styled-components"

const Input = styled.input`
    position: absolute;
    width: 318px;
    height: 224px;
    border-radius: 2rem;
`

export const InputForm = () => {
    return (
        <Input type="textarea" />
    )
}