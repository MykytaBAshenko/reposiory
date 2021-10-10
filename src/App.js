import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authAction'
import { Switch, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Body from './components/body/Body'
import axios from 'axios';
axios.defaults.baseURL = "http://jl5.work:10039/"
axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem("token")}`}

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    const token = localStorage.getItem('token')
    if(token) {
       axios.post('/rest/v1/get-profile', null).then(res =>  dispatch(dispatchGetUser(res)))
    }
  }, [token])



  return (
    <Router>
      <div className="App">
        {/* {auth.isLogged ?
        <Header />: null
        } */}
            <Switch>
              <Route path="/" component={Body}/>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
