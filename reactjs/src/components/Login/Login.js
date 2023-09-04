import React, { useEffect } from 'react';
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService'

function Login(props) {
    const navigate = useNavigate()
    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')
    const defaultObjValidInput = {
        isValidInputLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

    useEffect(() => {
        let session = sessionStorage.getItem("account")
        if (session) {
            navigate('/')
            window.location.reload()
        }
    }, [navigate])

    const handleCreate = () => {
        navigate('/register')
    }

    const handlePressEnter = (e) => {
        if (e.code === 'Enter' && e.keyCode === 13) {
            handleLogin()
        }
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)
        if (!valueLogin) {
            toast.error('Please enter your email address or phone number')
            setObjValidInput({ ...defaultObjValidInput, isValidInputLogin: false })
            return;
        }
        if (!password) {
            toast.error('Please enter your password')
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            return;
        }
        let response = await loginUser(valueLogin, password)
        if (response && +response.EC === 0) {
            //success
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            navigate('/users')
            window.location.reload();
        }
        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM)
        }

        console.log('>>> check response', response)
    }

    return (
        <div className='login-container'>
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
                        <input
                            type='text'
                            className={objValidInput.isValidInputLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input
                            type='password'
                            className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handlePressEnter(e)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'>
                            <a href='/' className='forgot-password'>Forgot password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreate()}>Create new user</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;