import React, { useState } from 'react';
import '../auth.css';
import { ToastContainer, toast } from 'react-toastify';
import config from '../../config';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch(config.API_BASE_URL + '/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
                credentials: "include"
            });
            const data = await response.json();
            if (data.ok) {
                toast.success('Admin Registration Successful');
                window.location.href = '/admin/login';
            } else {
                toast.error('Admin Registration Failed');
            }
        } catch (error) {
            toast.error('An error occurred during registration');
            console.error('An error occurred during registration', error);
        }
    }

    return (
        <div className='admin-signup-page'>
            <div className='signup-container'>
                <form className='admin-signup-form'>
                    <h2>Admin Signup</h2>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={handleSignup}>Sign Up</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;