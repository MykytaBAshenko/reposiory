
import React, { useState, useEffect } from 'react'
import { Link, useHistory, Switch, Route  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'


const MobileCarNavbar = (props) => {
const [data, setdata] = useState({})

  useEffect(() => {
    axios.post(`/rest/v1/data/get-all-info?item_id=${props.match.params.carId}`).then(d => setdata(d.data))
  },[props])
return <div class="header-area" id="headerArea1">
      <div class="container">
        {console.log(data)}
        <div class="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
      <div class="back-button"><Link to="/"><svg width="32" height="32" viewBox="0 0 16 16" class="bi bi-arrow-left-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
</svg></Link></div> 
          <div class="page-heading">
            <p class="mb-0">{data?.information?.model}</p>
          </div>
		  <Link class="btn-close" id="settingCardClose" to="/"></Link>
        </div>
      </div>
    </div>
}


export default MobileCarNavbar