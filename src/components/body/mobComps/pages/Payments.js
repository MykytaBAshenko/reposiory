// /rest/v1/data/invoices-list


import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const IndexPage = () => {
  const [cars, setcars] = useState([])
  const [selectedcount, setselectedcount] = useState(50)
  const [whichpage, setwhichpage] = useState(0)
  const [search, setsearch] = useState("")
  const [searchcars, setsearchcars] = useState([])
  useEffect(() => {
      axios.post("/rest/v1/data/invoices-list", {
          "per-page": 100000,
          "page": 0
      }).then(res => {
          console.log(res)
          setcars(res.data.table_content)
          setsearchcars(res.data.table_content)
      })
  }, [

  ])
  let special_important_var
  const setsearchfn = (value) => {
      setsearch(value)
      let serach_arr =[]
      for(let y =0; y < cars.length; y++) {
          if(cars[y].model.indexOf(value) != -1 || cars[y].vin_number.indexOf(value) != -1){
              serach_arr.push(cars[y])
          }
      }
      setsearchcars(serach_arr)
  } 
  useEffect(() => { }, [selectedcount, whichpage, cars, search])
  return (


          <div className="container">


              <div className="card">


                  <div id="dataTable_wrapper" className="dataTables_wrapper no-footer">

                      <div className="dataTables_length" id="dataTable_length">

                          <label>
                              Show <select name="dataTable_length" aria-controls="dataTable" value={selectedcount} onChange={e =>{
                                  setselectedcount(e.target.value);setwhichpage(0)}} className="form-select form-select-sm">

                                  <option value="10">

                                      10</option>
                                  <option value="20">

                                      20</option>
                                  <option value="50">

                                      50</option>
                                  <option value="100">

                                      100</option>
                              </select>


                              entries</label>
                      </div>
                      <div id="dataTable_filter" className="dataTables_filter">

                          <label>
                              Search:<input value={search} onChange={(e) => setsearchfn(e.target.value) } type="search" className="form-control form-control-sm" placeholder="" aria-controls="dataTable" />
                          </label>
                      </div>
                      <div className='tableContainer'>

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
                          {searchcars?.map((c, i) => {
                              return ((i >= (selectedcount * (whichpage ))) && (i <selectedcount * (whichpage + 1)  ) ) ? <tr key={i.toString() + Math.random()} className= {i%2 == 0 ? "odd" : "even" }>

<td className="sorting_1">

  <Link to={"/car/"+c.item_id}>

      {c.model}</Link>
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
          {(() => {special_important_var = i; return <></>})()}                  
</tr>
: null}
                          )}
                          </tbody>

                      </table>
                      </div>
                      <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">

                          Showing {selectedcount * whichpage  + 1} to {selectedcount * whichpage+special_important_var + 1} of {searchcars?.length} entries</div>
                      <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">

                          {/* <a className="paginate_button previous disabled" aria-controls="dataTable" data-dt-idx="0" tabIndex="-1" id="dataTable_previous">

                              Previous</a> */}
                          <span>
                              {
                                  (() => {
                                      let how_many_cars = (searchcars?.length / selectedcount)
                                      
                                      return (
                                          how_many_cars == 0 ? 
                                          null :  (() => {
                                              let arr = []
                                              for(let y = 0; y < how_many_cars; y++){
                                                  arr.push(
                                                      <a className={"paginate_button " + (y == whichpage ? "current" : "") } onClick={() => setwhichpage(y)} aria-controls="dataTable" data-dt-idx="1" tabIndex="0">

                                  {y+1}</a>
                                                  )
                                              }
                                              return arr
                                          })()
                                      )
                                  })()
                              }
                          </span>
                          {/* <a className="paginate_button next disabled" aria-controls="dataTable" data-dt-idx="2" tabIndex="-1" id="dataTable_next">

                              Next</a> */}
                      </div>
                  </div>

              </div>

          </div>

  )
}


export default IndexPage