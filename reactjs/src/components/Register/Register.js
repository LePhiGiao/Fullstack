import React from 'react';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



function Register(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleLogin = () => {
        navigate('/login')
    }

    const isValidInputs = () => {
        if (!email) {
            toast.error('Email is required!')
            return false
        }
        let regx = /^\S+@\S+\.\S+$/
        if (!regx.test(email)) {
            toast.error('Email is invalid!')
            return false
        }

        if (!phone) {
            toast.error('Phone is required!')
            return false
        }
        if (!username) {
            toast.error('username is required!')
            return false
        }
        if (!password) {
            toast.error('Password is required!')
            return false
        }
        if (password !== confirmPassword) {
            toast.error('PassconfirmPassword is invalid!')
            return false
        }

        return true
    }

    const handleRegister = () => {
        let check = isValidInputs()
        let userData = { email, phone, username, password }
        console.log('>>>> check UserData: ', userData)
        // toast.success("Wow so easy !");
    }

    useEffect(() => {
        // axios.get('http://localhost:8081/api/test-api')
        //     .then(res => {
        //         console.log('Check data axios: ', res)
        //     })
    }, [])

    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            <h1><strong>facebook</strong></h1>
                        </div>
                        <div className='title'>
                            <h5>Nothing is impossible</h5>
                        </div>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            <h1><strong>facebook</strong></h1>
                        </div>
                        <div className='from-group'>
                            <label>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Email address'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Phone Number</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Phone number'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Phone number'
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='password'
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <span className='text-center'>
                            <a href='/' className='forgot-password'>Already acount ?</a>
                        </span>
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;