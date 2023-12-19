import React from 'react';
import { FaShoppingCart, FaChartLine, FaArrowUp, FaTruck } from 'react-icons/fa';

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 d-flex">
          <div className="card border-primary mb-3 shadow flex-fill bg-black text-white">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title">230</h5>
                <p>Products</p>
                {/* Add your product-related content here */}
              </div>
              <FaShoppingCart className="icon text-primary" size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-3 d-flex">
          <div className="card border-primary mb-3 shadow flex-fill bg-black text-white">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title">2450</h5>
                <p>Sales</p>
              </div>
              <FaChartLine className="icon text-primary" size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-3 d-flex">
          <div className="card border-primary mb-3 shadow flex-fill bg-black text-white">
            <div className="card-body d-flex align-items-center justify-content-between ">
              <div>
                <h5 className="card-title">20%</h5>
                <p>Increase</p>
              </div>
              <FaArrowUp className="icon text-primary" size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-3 d-flex">
          <div className="card border-primary mb-3 shadow flex-fill bg-black text-white">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title">2250</h5>
                <p>Delivery</p>
              </div>
              <FaTruck className="icon text-primary" size={40} />
            </div>
          </div>
        </div>
      </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-primary mb-3 shadow bg-black text-white">
              <div className="card-body">
                <table className="table caption-top mt-2" style={{ backgroundColor: "black", color: "white" }}>
                  <caption className='text-dark fs-4'><strong className='text-white'>Recent Orders</strong></caption>
                  <thead>
                    <tr>
                      <th scope="col" className='bg-black text-white'>Order ID</th>
                      <th scope="col" className='bg-black text-white'>Product Name</th>
                      <th scope="col" className='bg-black text-white'>Quantity</th>
                      <th scope="col" className='bg-black text-white'>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className='bg-black text-white'>1</th>
                      <td className='bg-black text-white'>Product A</td>
                      <td className='bg-black text-white'>2</td>
                      <td className='bg-black text-white'>$50.00</td>
                    </tr>
                    <tr>
                      <th scope="row" className='bg-black text-white'>2</th>
                      <td className='bg-black text-white'>Product B</td>
                      <td className='bg-black text-white'>1</td>
                      <td className='bg-black text-white'>$30.00</td>
                    </tr>
                    <tr>
                      <th scope="row" className='bg-black text-white'>3</th>
                      <td className='bg-black text-white'>Product C</td>
                      <td className='bg-black text-white'>3</td>
                      <td className='bg-black text-white'>$80.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
