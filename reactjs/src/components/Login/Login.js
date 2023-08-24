import React from 'react';
import './Login.scss'

function Login(props) {
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
                        <input type='text' className='form-control' placeholder='Email address or phone number' />
                        <input type='password' className='form-control' placeholder='password' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>
                            <a href="#" className='forgot-password'>Forgot password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new user</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;