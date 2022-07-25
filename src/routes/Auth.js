import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from "firebaseInstance";
import styled from "styled-components";

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
        display: flex;
        flex-direction: column;
        width: 15rem;
        }
        input {
            margin: 0.5rem;
            padding: 0.5rem;
            border-radius: 0.3rem;
            border: 0;
            }
        .auth {
            background-color: transparent;
            border-radius: 0;
            border-bottom: 1px solid white;
            color: #CECCDE;
        }
        .submit {
            cursor: pointer;
            font-weight: 500;
        }
        .submit:hover {
            background: #ADB5C9;
        }
`
    
const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('')
    const auth = getAuth();
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
        if(newAccount) {
            data = await createUserWithEmailAndPassword(auth, email, password)
        } else {
            data = await signInWithEmailAndPassword(auth, email, password)
        }
        console.log(data)
        } catch (error) {
            setError(error.message.replace("Firebase:", ""))
        }
    }
    const onClick = async (event) => {
        const {
            target: {name}, 
        } = event;
        let provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        console.log(data)
    }

    return (
    <AuthContainer>
        <header>
            <h1 className="logo">toomanythoughts.</h1>
        </header>
        <form onSubmit={onSubmit}>
            <input 
                name="email" 
                className="auth"
                type="text"
                placeholder="e-mail" 
                required 
                value={email}
                onChange={onChange}/>
            <input 
                name="password" 
                type="password" 
                className="auth"
                placeholder="password" 
                required 
                value={password}
                onChange={onChange}/>
            <input 
                type="submit"
                name="submit"
                className="submit"
                value={newAccount ? "Log in with e-mail" : "Log in"} />
            <input
                type="button"
                onClick={onClick}
                name="google" 
                className="submit"
                value="Log in with Google" />
            {error}
        </form>
    </AuthContainer>
)
}

export default Auth;