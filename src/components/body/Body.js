import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import CarBody from './mobComps/pages/carComponent/CarBody'
import NotFound from '../utils/NotFound/NotFound'
import { useSelector, useDispatch } from 'react-redux'
import MobileFooter from './mobComps/MobileFooter'
import MobileNavbarSidebar from './mobComps/MobileNavbarSidebar'
import Carfax from './mobComps/pages/Carxaf'

import IndexPage from './mobComps/pages/IndexPage'
import { dispatchLogin, dispatchGetUser } from '../../redux/actions/authAction'

import axios from 'axios'


// import Home from '../body/home/Home'



function Body(props) {

    const check_token = () => {
        axios.post('/rest/v1/get-profile', null).then(d => {
            if(d.data.error){
                localStorage.removeItem("token")
                localStorage.removeItem("firstLogin")
                props.history.push("/login")
        }
        
        })

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
        check_token()
        
    },[
         user, isLogged
    ])

    return (
        <section>

            <Switch>
            <Route path="/login" component={null} exact />

                <Route path="*" component={MobileNavbarSidebar}  />


            </Switch>
            <div className="page-content-wrapper py-3">

            <Switch>
                <Route path="/" component={check_is_login() ? IndexPage : Login} exact />
                <Route path="/car/:carId" component={check_is_login() ? CarBody : Login} exact />
                <Route path="/carfax" component={check_is_login() ? Carfax : Login} exact />


                {/* <Route path="/questions" component={Home} exact />
                
                <Route path="/question/:questionId" component={Question} exact />
                
                <Route path="/answear/:answearId/edit" component={isLogged ? EditAnswear : Login} exact />
                
                <Route path="/question/:questionId/edit" component={isLogged ? EditQuestion : Login} exact />
                
                <Route path="/notifications" component={isLogged ? Notifications : Login} exact />
                
                <Route path="/users" component={Users} exact />
                
                <Route path="/user/:userId" component={User} exact />
                 */}
                <Route path="/login" component={Login} exact />

                {/* <Route path="/register" component={isLogged ? NotFound : Register} exact />
                
                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />
                
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                
                <Route path="/settings" component={isLogged ? Settings : NotFound} exact />
                
                <Route path="/create" component={isLogged ? Createquestion : NotFound} exact />
                
                <Route path="/admin" component={isAdmin ? Admin : NotFound} exact />
                
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                 */}
            </Switch>
                </div>
            <Switch>
                <Route path="/login" component={null} />

                <Route path="/" component={MobileFooter} />


            </Switch>

        </section>

    )
}

export default Body
