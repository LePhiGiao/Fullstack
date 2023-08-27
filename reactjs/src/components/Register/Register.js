import React from 'react';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService'



function Register(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput)

    const handleLogin = () => {
        navigate('/login')
    }

    const isValidInputs = () => {

        setObjectCheckInput(defaultValidInput)

        if (!email) {
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error('Email is required!')
            return false
        }
        let regx = /^\S+@\S+\.\S+$/
        if (!regx.test(email)) {
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error('Email is invalid!')
            return false
        }

        if (!phone) {
            setObjectCheckInput({ ...defaultValidInput, isValidPhone: false })
            toast.error('Phone is required!')
            return false
        }
        if (!username) {
            setObjectCheckInput({ ...defaultValidInput, isValidUsername: false })
            toast.error('username is required!')
            return false
        }
        if (!password) {
            setObjectCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error('Password is required!')
            return false
        }
        if (password !== confirmPassword) {
            setObjectCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            toast.error('PassconfirmPassword is invalid!')
            return false
        }

        return true
    }

    const handleInutEmail = e => {
        setEmail(e.target.value)
        setObjectCheckInput({ ...defaultValidInput, isValidEmail: true })
    }

    const handleRegister = async () => {
        let check = isValidInputs()
        let userData = { email, phone, username, password }

        if (check === true) {
            let response = await registerNewUser(userData)
            let serverData = response.data
            if (+serverData.EC === 0) {     //convert từ string sang number
                toast.success(serverData.EM)
                navigate('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    }

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
                                className={objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address'
                                value={email}
                                onChange={e => handleInutEmail(e)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Phone Number</label>
                            <input
                                type='text'
                                className={objectCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Phone number'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Username</label>
                            <input
                                type='text'
                                className={objectCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                placeholder='User Name'
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className={objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='from-group'>
                            <label>Confirm Password</label>
                            <input
                                type='password'
                                className={objectCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Confirm Password'
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