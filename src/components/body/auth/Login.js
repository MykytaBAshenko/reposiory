import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { dispatchLogin, dispatchGetUser } from '../../../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function Login(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    // const { email, password, err, success } = user

    // const handleChangeInput = e => {
    //     const { name, value } = e.target
    //     setUser({ ...user, [name]: value, err: '', success: '' })
    // }
    

    const handleSubmit = async e => {

        e.preventDefault()
        const res = await axios.post('/rest/v1/login', { username, password })
        // alert(res?.data?.msg)
        if (res?.data?.token) {
            localStorage.setItem('firstLogin', true)
            localStorage.setItem('token', res?.data?.token)
            dispatch(dispatchLogin())
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")

            await axios.post('/rest/v1/get-profile', null).then(res => dispatch(dispatchGetUser(res)))
            console.log(1)
            history.push("/")
            
        }
    }
    const auth = useSelector(state =>
        state.auth)
    const { isLogged, user } = auth

    const check_is_login = () => {
        if(user.error || !Object.keys(user).length)
        return false;
        return true;
    }

    useEffect(() => {
        if(check_is_login())
            props.history.push("/")
    },[user])
    return (
        <div>
            <div className="internet-connection-status" id="internetStatus"></div>

            <div className="login-wrapper d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
                            <div className="text-center px-4"><img className="login-intro-img" src="img/core-img/lion1.png" alt="" /></div>
                            <div className="register-form mt-4 px-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="Username" value={username} name="email" onChange={e => setusername(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Enter Password" value={password} name="password" onChange={e => setpassword(e.target.value)} />
                                    </div>
                                    <button className="btn btn-primary w-100" type="submit">Sign In</button>
                                </form>
                            </div>
                            <div className="login-meta-data text-center"><a className="stretched-link forgot-password d-block mt-3 mb-1" href="page-forget-password.html">Forgot Password?</a>
                                <p className="mb-0">Didn't have an account? <a className="stretched-link" href="page-register.html">Register Now</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="login_page">
        //     <h2>Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="email">Email Address</label>
        //             <input type="text" placeholder="Enter email address" id="email"
        //                 value={username} name="email" onChange={e => setusername(e.target.value)} />
        //         </div>

        //         <div>
        //             <label htmlFor="password">Password</label>
        //             <input type="password" placeholder="Enter password" id="password"
        //                 value={password} name="password" onChange={e => setpassword(e.target.value)} />
        //         </div>

        //         <div className="Login_control">
        //             <button className="LoginBtn" type="submit">Login</button>
        //             <Link to="/forgot_password">Forgot your password?</Link>
        //         </div>
        //     </form>

        //     <p>New User? <Link to="/register">Register</Link></p>
        // </div>
    )
}

export default Login
