import "./orderinfo.css"
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { apiUrl } from "../../services/api";

export function OrderInfo({ id }) {
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    apiUrl.get(`/user/${id}`, {
      withCredentials: true
    }).then(res => {
      setOrderData(res.data)
    }).catch((e) => {
      //console.log(e)
    })
  }, [])

  return (
    <div>
      <h2 className="orders__title">Books Ordered</h2>
      <table className="orderlist">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order, index) => {
            return <tr key={index}>
              <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
              <td>{order.total / 100}</td>
              <td>{order.payment_status} ✅</td>
              <td>{format(new Date(order.createdAt), "dd-MM-yy")}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

