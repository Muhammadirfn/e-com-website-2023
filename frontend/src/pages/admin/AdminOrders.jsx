import React,{useState, useEffect} from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import {  Select } from 'antd'
import axios from 'axios'
import { useAuth } from '../../components/context/auth';
import moment from 'moment';
const {Option} = Select

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped" , "deliverd", "cancle"])
  const [changedStatus, setChangedStatus] = useState("")
  const [order, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/auth/all-orders`);
      setOrders(response.data); // Set state with response.data
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);
  const handleChange = async (orderId, value) =>{
    try {
      const {data} = await axios.put(`http://localhost:5000/api/v1/auth/status/${orderId}`, {status: value})
      getOrders()
    } catch (error) {
      
    }
  }
  return (
    <Layout title={"All Orders Data"}> 
    <div className="row ">
      <div className="col-md-3">
        <AdminMenu/>

      </div>
      <div className="col-md-9 mt-4">
            <h1 className="text-lg font-semibold">All Orders</h1>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyers</th>
                    <th>Orders</th>
                    <th>Payment</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.map((o, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                      <Select
  border={false}
  onChange={(value) => handleChange(o._id,value)}
  defaultValue={o?.status}
>
  {status.map((s, i) => (
    <Option key={i} value={s}>
      {s}
    </Option>
  ))}
</Select>

                      </td>
                      <td>{o?.buyers?.name || "N/A"}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Move the closing </div> here */}
            {order?.map((o, i) => (
              <div className="row m-4 card flex-row" key={i}>
                {o?.products.map((p, j) => (
                  <div className="col-md-4" key={j}>
                    <img
                      src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-48 object-cover"
                    />
                    <h4>{p.name}</h4>
                    <p>{p.description.substring(0, 40)}</p>
                    <h4>Price: {p.price}</h4>
                  </div>
                ))}
              </div>
            ))}
          </div>
    </div>
      
    </Layout>
  )
}

export default AdminOrders
