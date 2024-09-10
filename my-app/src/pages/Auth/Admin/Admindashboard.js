import React from 'react'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { useAuth } from '../../../context/Auth'
const Admindashboard = () => {
  const [auth ]= useAuth();
  return (
    <div>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          {/* <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1>Admin Name: {auth?.user?.name}</h1>
              <h1>Admin Email: {auth?.user?.email}</h1>
              <h1>Admin Contact: {auth?.user?.phone}</h1>
            </div>

          </div> */}
           <div className='col-md-5 mt-4'>
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <p className="mb-0" style={{fontWeight:'bold'}}>Full Name</p>
                  </div>
                  <div className="col-7">
                    <p className="text-muted mb-0" style={{fontWeight:'bold'}}>{auth?.user?.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-5">
                    <p className="mb-0" style={{fontWeight:'bold'}}>Email</p>
                  </div>
                  <div className="col-7">
                    <p className="text-muted mb-0" style={{fontWeight:'bold'}}>{auth?.user?.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-5">
                    <p className="mb-0" style={{fontWeight:'bold'}}>Phone</p>
                  </div>
                  <div className="col-7">
                    <p className="text-muted mb-0">{auth?.user?.phone}</p>
                  </div>
                </div>
                <hr />
               
                <div className="row">
                  <div className="col-5">
                    <p className="mb-0" style={{fontWeight:'bold'}}>Address</p>
                  </div>
                  <div className="col-7">
                    <p className="text-muted mb-0">{auth?.user?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

   
      
    </div>
  )
}

export default Admindashboard
