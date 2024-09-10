import React from 'react'
import UserMenu from '../../../components/Layout/UserMenu'
import { useAuth } from '../../../context/Auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
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
  );
}

export default Dashboard;
