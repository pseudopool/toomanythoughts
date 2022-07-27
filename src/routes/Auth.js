import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from "firebaseInstance";
import { motion } from "framer-motion";
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
        input, button {
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
        .signin {
            background-color: transparent;
            color: white;
            font-size: 0.3rem;
            margin: 0;
            cursor: pointer;
            border: 0;
            float: left;
        }
        .googleImg {
            background-image: url('');
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
    const onClick = async (event) => {
        event.preventDefault();
        try {
            let data;
        if(event.target.name === "signin") {
            data = await createUserWithEmailAndPassword(auth, email, password)
        } else if (event.target.name === "login") {
            data = await signInWithEmailAndPassword(auth, email, password)
        } else if (event.target.name === "google") {
            const {
                target: {name}, 
            } = event;
            let provider = new GoogleAuthProvider();
            const data = await signInWithPopup(authService, provider);
            console.log(data)
        }
        console.log(data)
        } catch (error) {
            setError(error.message.replace("Firebase:", ""))
        }
    }

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
    <AuthContainer>
        <header>
            <h1 className="logo">toomanythoughts.</h1>
        </header>
        <form>
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
            <button
                type="submit"
                name="signin"
                className="signin"
                onClick={onClick}>
            이 메일로 가입하기 </button>
            <button
                type="button"
                name="google" 
                className="submit"
                onClick={onClick}>
            Continue with Google
            <p className="googleImg"></p>
            </button>
            <button
                type="submit"
                name="login"
                className="submit"
                onClick={onClick}>
            Log in
            </button>
            {error}
        </form>
    </AuthContainer>
    </motion.div>
)
}

export default Auth;