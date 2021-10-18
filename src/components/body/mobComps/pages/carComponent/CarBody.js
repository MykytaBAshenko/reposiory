import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL 



const CarBody = (props) => {
const [data, setdata] = useState({})
const [show, setshow] = useState(0)
  useEffect(() => {
    axios.post(`/rest/v1/data/get-all-info?item_id=${props.match.params.carId}`).then(d => setdata(d.data))
  },[props])
  return  <div className="container">
        <div className="card">
          {console.log(data)}
            <div className="standard-tab">
              <ul className="nav rounded-lg mb-3  shadow-sm" id="affanTabs1" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="btn active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Info</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="btn" id="photo-tab" data-bs-toggle="tab" data-bs-target="#photo" type="button" role="tab" aria-controls="photo" aria-selected="false">Gallery</button>
                </li>
				<li className="nav-item" role="presentation">
                  <button className="btn" id="payments-tab" data-bs-toggle="tab" data-bs-target="#payments" type="button" role="tab" aria-controls="payments" aria-selected="false">Payments</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="btn" id="doc-tab" data-bs-toggle="tab" data-bs-target="#doc" type="button" role="tab" aria-controls="doc" aria-selected="false">Doc</button>
                </li>
				<li className="nav-item" role="presentation">
                  <button className="btn" id="invoice-tab" data-bs-toggle="tab" data-bs-target="#invoice" type="button" role="tab" aria-controls="invoice" aria-selected="false">Invoice</button>
                </li>
              </ul>
              <div className="tab-content" id="affanTabs1Content">
                <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
					<ul className="list-group">
					  <li className="list-group-item d-flex align-items-center justify-content-between">Name (Model)<span style={{color:"#3e3b3b"}}>{data?.information?.model}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Type<span style={{color:"#3e3b3b"}}>{data?.information?.type} </span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">VIN Number<span style={{color:"#3e3b3b"}}>{data?.information?.vin_number}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Key<span style={{color:"#3e3b3b"}}>{data?.information?.key ? "Yes" : "No"}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Auction<span style={{color:"#3e3b3b"}}>{data?.information?.auction_name}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Lot<span style={{color:"#3e3b3b"}}>{data?.information?.lot}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Auction Date<span style={{color:"#3e3b3b"}}>{data?.information?.date_auction}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Buyer N<span style={{color:"#3e3b3b"}}>{data?.information?.buyer_n}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Port of loading<span style={{color:"#3e3b3b"}}>{data?.information?.loading_port}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Date of loading<span style={{color:"#3e3b3b"}}>{data?.information?.date_loading}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Lines<span style={{color:"#3e3b3b"}}>{data?.information?.lines}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Container Number<span style={{color:"#3e3b3b"}}>{data?.information?.container_number}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Booking Number<span style={{color:"#3e3b3b"}}>{data?.information?.booking_number}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Port of arrival<span style={{color:"#3e3b3b"}}>{data?.information?.port_arrival}</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Expected arrival date<span style={{color:"#3e3b3b"}}>{data?.information?.date_arrival}</span></li>
					</ul>
                </div>
                <div className="tab-pane fade" id="photo" role="tabpanel" >
					<div className="card image-gallery-card">
						
						<div className="gallery-menu">
							<button id="gallery-menu-active-btn" onClick={() => setshow(0)} className={show === 0 ? "active" : ""} data-filter=".photo">Photo</button>
							<button onClick={() => setshow(1)} data-filter=".video" className={show === 1 ? "active" : ""}>Video</button>
							<button onClick={() => setshow(2)} data-filter=".container" className={show === 2 ? "active" : ""}>Photo with Container</button>
						  </div>
							{data?.photos ? console.log(data?.photos[90290]) : null}

						<div className="gallery-wrapper row g-3">
							{
								show == 0 ?  
								data?.photos ? 
								Object.keys(data?.photos).map((keyName, i) => (
									<div key={i+ Math.random()} className="single-image-gallery photo">
								<a className="gallery-img" href={REACT_APP_SERVER_URL+"/uploads/"+data?.photos[keyName] } target="_blank" data-effect="mfp-zoom-in"><img src={REACT_APP_SERVER_URL+"/uploads/"+data?.photos[keyName] } alt=""/></a>
								</div>
							))
		:null
		:null
							}
							
							{
								show == 1 ?  
								data?.videos ? 

								Object.keys(data?.videos).map((keyName, i) => (
									<div key={i+ Math.random()} className="single-image-gallery video">
							
							<div className="ratio ratio-16x9">
							<iframe src={keyName}></iframe>
							</div>
						  </div>
							))
		:null
		:null
							}
							{
								show == 2 ?  
								data?.photosContainer ? 

								Object.keys(data?.photosContainer).map((keyName, i) => (
									<div key={i+ Math.random()} className="single-image-gallery container">
								<a className="gallery-img" href={REACT_APP_SERVER_URL+"/uploads/"+data?.photosContainer[keyName] } target="_blank" data-effect="mfp-zoom-in"><img src={REACT_APP_SERVER_URL+"/uploads/"+data?.photosContainer[keyName] } alt=""/></a>
								</div>
							))
		:null
		:null
							}

				

							{
								/* <div className="single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331124.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331124.jpg" alt=""/></a>
						  </div>
						  <div className="single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331103.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331103.jpg" alt=""/></a>
						  </div>
						  
						  <div className=" single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331110.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331110.jpg" alt=""/></a>
						  </div>
						  
						  <div className=" single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331114.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331114.jpg" alt=""/></a>
						  </div>
						  
						  <div className=" single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331114.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331114.jpg" alt=""/></a>
						  </div>
						  						  
						  <div className="single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331124.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331124.jpg" alt=""/></a>
						  </div>
						  
						  <div className="single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331103.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331103.jpg" alt=""/></a>
						  </div>
						  
						  <div className=" single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331110.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331110.jpg" alt=""/></a>
						  </div>
						  
						  <div className=" single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331114.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331114.jpg" alt=""/></a>
						  </div>
						  
						  <div className=" single-image-gallery photo">
							<a className="gallery-img" href="img/uploads/base_145513_4331114.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331114.jpg" alt=""/></a>
						  </div>
						  	
						  <div className="single-image-gallery container">
							<a className="gallery-img" href="img/uploads/base_145513_4331124.jpg" data-effect="mfp-zoom-in"><img src="img/uploads/base_145513_4331124.jpg" alt=""/></a>
						  </div>
						  
						  <div className="single-image-gallery video">
							
							<div className="ratio ratio-16x9">
							<iframe src="https://www.youtube.com/embed/lFGvqvPh5jI"></iframe>
							</div>
						  </div>
						  
						  <div className="single-image-gallery video">
							
							<div className="ratio ratio-16x9">
							<iframe src="https://www.youtube.com/embed/lFGvqvPh5jI"></iframe>
							</div>
						  </div> */}
						</div>
					</div>
                </div>
                <div className="tab-pane fade" id="payments" role="tabpanel" aria-labelledby="payments-tab">
					<ul className="list-group">
					  <li className="list-group-item d-flex align-items-center justify-content-between">Auction pay<span style={{color:"#3e3b3b"}}>
					  {/* <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color:"#25a73c"}}>
						<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
						<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
						</svg> */}
					  &nbsp;&nbsp;
					  {data?.payments?.auction_pay ?? 0} USD</span>
            </li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Land (Price)<span style={{color:"#3e3b3b"}}>{data?.payments?.price_land ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Container (Price)<span style={{color:"#3e3b3b"}}> 	{data?.payments?.price_container ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Total Price (Land+Container)<span style={{color:"#3e3b3b"}}> 	{data?.payments?.total_land_container ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Company Service<span style={{color:"#3e3b3b"}}>{data?.payments?.company_service ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Penalty Auction<span style={{color:"#3e3b3b"}}>{data?.payments?.penalty_auction ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Other services (Price)<span style={{color:"#3e3b3b"}}>{data?.payments?.overpayment ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Insurance fee<span style={{color:"#3e3b3b"}}>{data?.payments?.insurance_fee ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Total<span style={{color:"#3e3b3b"}}>
						{/* <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color:"#d71f0f"}}>
						<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
						<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
						</svg> */}
					  &nbsp;&nbsp;
					  {data?.payments?.total_shipping ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Car damage<span style={{color:"#3e3b3b"}}>{data?.payments?.car_damage ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Overpayment<span style={{color:"#3e3b3b"}}>{data?.payments?.overpayment ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Brokerage<span style={{color:"#3e3b3b"}}>{data?.payments?.brokerage ?? 0} USD</span></li>
					  <li className="list-group-item d-flex align-items-center justify-content-between">Expeditor<span style={{color:"#3e3b3b"}}>{data?.payments?.expeditor ?? 0} USD</span></li>
					</ul>
                </div>
				<div className="tab-pane fade" id="doc" role="tabpanel" aria-labelledby="doc-tab">
				  <div className="container">
					<div className="card-c">
					  <div className="card-body text-center">
						<h5 className="mb-4">Upload your Documents</h5>
						<form action="element-form-file-upload.html#" method="GET">
						  <div className="form-file">
							<input className="form-control d-none" id="customFile" type="file"/>
							<label className="form-file-label justify-content-center" for="customFile"><span className="form-file-button btn btn-danger d-flex align-items-center justify-content-center">
								<svg width="22" height="22" viewBox="0 0 16 16" className="bi bi-plus-circle me-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
								</svg>Upload File</span></label>
						  </div>
						</form>
					  </div>
					</div>
						<table className="table mb-0 table-striped">
						  <thead>
							<tr>
							  <th scope="col">Date</th>
							  <th scope="col">Document Name</th>
							  <th scope="col">Download</th>
							</tr>
						  </thead>
						  <tbody>
								{data?.documents?.map((d, i) => <tr>
									<td>{d.document_date}</td>
									<td>{d.document_name}</td>
									<td>
									<a  href={process.env.REACT_APP_SERVER_URL + "/uploads/"+d.url} title="Download report" target="_blank">
									<i class="fa fa-file-pdf-o"></i></a></td>
								</tr>
								)}
							
						  </tbody>
						</table>
				  </div>
				  <div className="divider border-danger"></div>
				  <div className="container">
					<div className="card-c">
					  <div className="card-body text-center">
						<h5 className="mb-4">Upload your Swift</h5>
						<form action="element-form-file-upload.html#" method="GET">
						  <div className="form-file">
							<input className="form-control d-none" id="customFile" type="file"/>
							<label className="form-file-label justify-content-center" for="customFile"><span className="form-file-button btn btn-danger d-flex align-items-center justify-content-center">
								<svg width="22" height="22" viewBox="0 0 16 16" className="bi bi-plus-circle me-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
								</svg>Upload File</span></label>
						  </div>
						</form>
					  </div>
					</div>
						<table className="table mb-0 table-striped">
						  <thead>
							<tr>
							  <th scope="col">Date</th>
							  <th scope="col">Swift Name</th>
							  <th scope="col">Download</th>
							</tr>
						  </thead>
						  <tbody>
							{data?.swift?.map((d, i) => <tr>
									<td>{d.swift_date}</td>
									<td>{d.swift_name}</td>
									<td>
									<a  href={process.env.REACT_APP_SERVER_URL + "/uploads/"+d.url} title="Download report" target="_blank">
									<i class="fa fa-file-pdf-o"></i></a></td>
								</tr>
								)}
							
						  </tbody>
						</table>
				  </div>
                </div>
				<div className="tab-pane fade" id="invoice" role="tabpanel" aria-labelledby="invoice-tab">
					  <div className="invoice-info text-end mb-4">
					  <br/>
						  <h5 className="mb-1">LION TRANS Inc.</h5>
						  <h6>Invoice No. #36A89G</h6>
						  <p className="mb-0">Due Date: Nov 16, 2021</p>
						</div>
						<div className="invoice-table">
						  <div className="table-responsive">
							<table className="table table-bordered caption-top">
							  <caption>List of works</caption>
							  <thead className="table-light">
								<tr>
								  <th>Sl.</th>
								  <th>Description</th>
								  <th>Unit</th>
								  <th>Q.</th>
								  <th>Total</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>1</td>
								  <td>Website design and development</td>
								  <td>$120</td>
								  <td>4</td>
								  <td>$480</td>
								</tr>
								<tr>
								  <td>2</td>
								  <td>Digital Marketing</td>
								  <td>$80</td>
								  <td>2</td>
								  <td>$160</td>
								</tr>
								<tr>
								  <td>3</td>
								  <td>Support</td>
								  <td>$100</td>
								  <td>1</td>
								  <td>$100</td>
								</tr>
							  </tbody>
							  <tfoot className="table-light">
								<tr>
								  <td className="text-end" colspan="4">Total:</td>
								  <td className="text-end">$740</td>
								</tr>
								<tr>
								  <td className="text-end" colspan="4">VAT (10%):</td>
								  <td className="text-end">$74</td>
								</tr>
								<tr>
								  <td className="text-end" colspan="4">Grand Total:</td>
								  <td className="text-end">$814</td>
								</tr>
							  </tfoot>
							</table>
						  </div>
						</div>
						<p className="mb-0">Notice: This is auto generated invoice.</p>
                </div>
              </div>
            </div>
        </div>
      </div>
}

export default CarBody

