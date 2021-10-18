import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Carfax = () => {
  const [callbackreload, setcallbackreload] = useState(true)
  const [enru, setenru] = useState(false)
  const [carfax, setcarfax] = useState({})
  useEffect(()=> {
    axios.post("/rest/v1/data/carfax").then(d => {
      setcarfax(d.data)
    })
  },[callbackreload])
  const [inputValue, setinputValue] = useState("")
  const carfaxRequest = () => {
    axios.post("/rest/v1/data/carfax-request", {
      "vin":inputValue.trim(),
      "language":enru?"ru":"en"
  }
  ).then(d => {
    setinputValue("")
    setcallbackreload(!callbackreload)
  })
  }
  return <>
  <div className="container">
      <div className="card-c">
        <div className="card-body text-center">
          <h2 className="mb-4" style={{"color": "#d71f0f;"}}>Order report from CARFAX</h2>
          <div className="form-group">
            <input className="form-control" id="exampleInputText" type="text" value={inputValue} onChange={(e) => setinputValue(e.target.value)} placeholder="Enter VIN Number"/>
          </div>
          <div className="form-control-mine">
            <input className="form-check-input form-check-danger" type="checkbox" value={enru} onChange={() => setenru(!enru)} id="dangerCheckbox" checked={enru}/>
            <label className="form-check-label" for="dangerCheckbox">En</label><label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            {/* <label>84 free reguests remain</label> */}
            <br/>
          </div>
          <a className="btn btn-creative btn-danger btn-lg" onClick={carfaxRequest}>Submit</a>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="element-heading mt-3">
        <br/>
      </div>
    </div>
    <div className="container">
      <div className="card">
        <table className="table mb-0 table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">VIN Number</th>
              <th scope="col">Report</th>
            </tr>
          </thead>
          {console.log(carfax)}
          <tbody>
            {
              carfax?.carfax_requests?.map(
                (c, i) => <tr key={i+ Math.random()}>
                <td>{c.create_at}</td>
                <td>{c.vin}</td>
                <td>{c.responce_code == 200  ? <a className='download_shit' href={process.env.REACT_APP_SERVER_URL + "/files_carfax/"+c.file} title="Download report" download={`report_${c.vin}.pdf`}>
                                                     <i class="fa fa-file" aria-hidden="true"> Download</i></a> :carfax.carfax_errors[c.responce_code]}</td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default Carfax