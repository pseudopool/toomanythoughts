import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from "firebaseInstance";
    
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
    const toggleAccount = () => setNewAccount((prev) => !prev)
    const onSocialClick = async (event) => {
        const {
            target: {name}, 
        } = event;
        let provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        console.log(data)
    }
    return (
    <div>
    <form onSubmit={onSubmit}>
        <input 
            name="email" 
            type="text" 
            placeholder="Email" 
            required 
            value={email}
            onChange={onChange}/>
        <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={onChange}/>
        <input 
            type="submit" 
            value={newAccount ? "create Account" : "Log in"} />
        {error}
    </form>
    <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
    </span>

    <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
    </div>
</div>
)
}

export default Auth;