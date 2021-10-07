import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'
import { useSelector } from 'react-redux'
import MobileFooter from './mobComps/MobileFooter'
import MobileNavbarSidebar from './mobComps/MobileNavbarSidebar'
import axios from 'axios'


// import Home from '../body/home/Home'

const Home = () => {
    const [cars, setcars] = useState([])
    const [selectedcount, setselectedcount] = useState(50)
    const [whichpage, setwhichpage] = useState(0)
    useEffect(() => {
        axios.post("/rest/v1/data/current-list", {
            "per-page": 100000,
            "page": 0
        }).then(res => {
            console.log(res)
            setcars(res.data.table_content)
            // console.log()
        })
    }, [

    ])
    useEffect(() => { }, [selectedcount, whichpage, cars])
    return (
        <div className="page-content-wrapper py-3">


            <div className="container">


                <div className="card">


                    <div id="dataTable_wrapper" className="dataTables_wrapper no-footer">

                        <div className="dataTables_length" id="dataTable_length">

                            <label>
                                Show <select name="dataTable_length" aria-controls="dataTable" value={selectedcount} onChange={e =>
                                    setselectedcount(e.target.value)} className="form-select form-select-sm">

                                    <option value="1">

                                        1</option>
                                    <option value="25">

                                        25</option>
                                    <option value="50">

                                        50</option>
                                    <option value="100">

                                        100</option>
                                </select>


                                entries</label>
                        </div>
                        <div id="dataTable_filter" className="dataTables_filter">

                            <label>
                                Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="dataTable" />
                            </label>
                        </div>
                        <table className="data-table w-100 dataTable no-footer" id="dataTable" role="grid" aria-describedby="dataTable_info">


                            <thead>

                                <tr role="row">

                                    <th className="sorting sorting_asc" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: "165px" }}>
                                        Name</th>
                                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="VIN Number: activate to sort column ascending" style={{ width: "140px" }}>
                                        VIN Number</th>
                                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Lot: activate to sort column ascending" style={{ width: "100px" }}>
                                        Lot</th>
                                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Key: activate to sort column ascending" style={{ width: "36px" }}>
                                        Key</th>
                                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Title: activate to sort column ascending" style={{ width: "39px" }}>
                                        Title</th>
                                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Dispatch point: activate to sort column ascending" style={{ width: "220px" }}>
                                        Dispatch point</th>
                                </tr>

                            </thead>

                            <tbody>
                            {cars.map((c, i) => <tr className= {i%2 == 0 ? "odd" : "even" }>


<td className="sorting_1">

    <a href="card.html">

        {c.model}</a>
</td>

<td>
{c.vin_number}</td>

<td>
{c.lot}</td>

<td>
{c.key ? "Yes" : "No"}</td>

<td>
{c.title ? "Yes" : "No"}</td>

<td>
    {c.model_auction_id}</td>

</tr>

                            )}
                            </tbody>

                        </table>
                        <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">

                            Showing 1 to 18 of {cars.length} entries</div>
                        <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">

                            {/* <a className="paginate_button previous disabled" aria-controls="dataTable" data-dt-idx="0" tabIndex="-1" id="dataTable_previous">

                                Previous</a> */}
                            <span>
                                <a className="paginate_button current" aria-controls="dataTable" data-dt-idx="1" tabIndex="0">

                                    1</a>
                            </span>
                            {/* <a className="paginate_button next disabled" aria-controls="dataTable" data-dt-idx="2" tabIndex="-1" id="dataTable_next">

                                Next</a> */}
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )
}


function Body() {
    const auth = useSelector(state =>
        state.auth)
    const { isLogged, user } = auth
    return (
        <section>


            <Switch>

                <Route path="/" component={MobileNavbarSidebar} exact />


            </Switch>

            <Switch>

                <Route path="/" component={isLogged ? Home : Login} exact />

                {/* <Route path="/questions" component={Home} exact />
                
                <Route path="/question/:questionId" component={Question} exact />
                
                <Route path="/answear/:answearId/edit" component={isLogged ? EditAnswear : Login} exact />
                
                <Route path="/question/:questionId/edit" component={isLogged ? EditQuestion : Login} exact />
                
                <Route path="/notifications" component={isLogged ? Notifications : Login} exact />
                
                <Route path="/users" component={Users} exact />
                
                <Route path="/user/:userId" component={User} exact />
                 */}
                <Route path="/login" component={isLogged ? Home : Login} exact />

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

            <Switch>

                <Route path="/" component={MobileFooter} exact />


            </Switch>

        </section>

    )
}

export default Body
