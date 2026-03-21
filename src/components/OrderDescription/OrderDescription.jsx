import "./orderdescription.css"
import React, { useEffect, useState } from 'react'
import { faUser, faTruck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { apiUrl } from "../../services/api";

function OrderDescription() {
    const { id } = useParams()

    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        apiUrl.get(`/user/order/${id}`, {
            withCredentials: true
        }).then(res => {
            setOrderData(res.data)
            //console.log(res.data)       
        }).catch((e) => {
            //console.log(e)
        })
    }, [])

    return (
        <>
            <div className="orderdescription">
                <div className="orderdesc__container">
                    <div className="orderdescicon">
                        <FontAwesomeIcon icon={faUser} className="orderdesc__icon" />
                    </div>
                    <div className="orderdesc__info">
                        <h3>Customer</h3>
                        <h4>{orderData?.shipping?.name}</h4>
                        <h4>{orderData?.shipping?.email}</h4>
                    </div>
                </div>
                <div className="orderdesc__container">
                    <div className="orderdescicon">
                        <FontAwesomeIcon icon={faTruck} className="orderdesc__icon" />
                    </div>
                    <div className="orderdesc__info">
                        <h3>Order Info</h3>
                        <h4>Shipping: {orderData?.shipping?.address?.city}, {orderData?.shipping?.address?.country}</h4>
                        <h4>Paid on: {orderData && orderData.createdAt ? format(new Date(orderData.createdAt), "dd/MM/yy") : "Date not available"}</h4>
                    </div>
                </div>
                <div className="orderdesc__container">
                    <div className="orderdescicon">
                        <FontAwesomeIcon icon={faLocationDot} className="orderdesc__icon" />
                    </div>
                    <div className="orderdesc__info">
                        <h3>Deliver To</h3>
                        <h4>Address: {orderData?.shipping?.address?.line1}</h4>
                        <h4>Address: {orderData?.shipping?.address?.line2}</h4>
                        <h4>{orderData?.delivery_status}</h4>
                    </div>
                </div>
            </div>
            <div className="order__products">
                {orderData?.products?.map((product, index) => {
                    return <div key={product.id} className="order__productcontainer">
                        <img src={product.image} alt={product.title} width="100px" height="100px" />
                        <div className="order__productinfo">
                            <h2 className="order__producttitle">{product.title}</h2>
                            <div className="order__productquantity">
                                <h2>quantity:</h2>
                                <h2>{product.quantity}</h2>
                            </div>
                            <div className="order__productprice">
                                <h2>price:</h2>
                                <h2>{product.price}</h2>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default OrderDescription