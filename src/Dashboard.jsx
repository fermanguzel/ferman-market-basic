import React, { useEffect, useContext, useState, useCallback } from 'react'
import { UserContext } from './UserContext';
import { OrdersService, ProductsService } from './Service';
import Order from "./Order";

let Dashboard = () => {

    let [orders, setOrders] = useState([]);
    let [orderDeletedAlert, setOrderDeletedAlert] = useState(false);
    let [orderPlacedAlert, setOrderPlacedAlert] = useState(false);

    let userContext = useContext(UserContext);

    let loadDataFromDatabase = useCallback(async () => {
        let ordersResponse = await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`, { method: "GET" });

        if (ordersResponse.ok) {
            let ordersResponseBody = await ordersResponse.json();

            let productsResponse = await ProductsService.fetchProducts();

            if (productsResponse.ok) {
                let productsResponseBody = await productsResponse.json();

                ordersResponseBody.forEach((order) => {
                    order.product = ProductsService.getProductByProductId(productsResponseBody, order.productId);
                });

                setOrders(ordersResponseBody);
            }
        }
    }, [userContext.user.currentUserId])


    useEffect(() => {
        document.title = "Dashboard - Ferman Market";

        loadDataFromDatabase();
    }, [userContext.user.currentUserId, loadDataFromDatabase]);

    let onBuyNowClick = useCallback(async (orderId, userId, productId, quantity) => {

        if (window.confirm("Do you want to place order for this product?")) {
            let updateOrder = {
                id: orderId,
                userId: userId,
                productId: productId,
                quantity: quantity,
                isPaymentCompleted: true
            };

            let ordersResponse = await fetch(`http://localhost:5000/orders/${orderId}`, {
                method: "PUT",
                body: JSON.stringify(updateOrder),
                headers: { "Content-type": "application/json" },
            });

            if (ordersResponse.ok) {
                loadDataFromDatabase();
                setOrderPlacedAlert(true);
            }
        }
    }, [loadDataFromDatabase]);

    let onDeleteClick = useCallback(async (orderId) => {
        if (window.confirm("Are you sure to delete this from cart?")) {
            let ordersResponse = await fetch(`http://localhost:5000/orders/${orderId}`, {
                method: "DELETE"
            });

            if (ordersResponse.ok) {
                loadDataFromDatabase();
                setOrderDeletedAlert(true);
            }
        }
    }, [loadDataFromDatabase]);

    return (
        <div className="row">
            <div className="col-12 py-3 header">
                <h4>
                    <i className="fa fa-dashboard"></i> Dashboard {" "}
                    <button className="btn btn-sm btn-success" onClick={loadDataFromDatabase}>
                        <i className="fa fa-refresh"></i> Refresh
                    </button>
                </h4>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-lg-6">
                        <h4 className="py-2 my-2 text-success border-bottom border-success">
                            <i className="fa fa-history"></i> Previous Orders <span className="badge bg-success">{OrdersService.getPreviousOrders(orders).length}</span>
                        </h4>
                        {OrdersService.getPreviousOrders(orders).length === 0 ? (<div className="text-danger"> No Orders </div>) : ("")}
                        {OrdersService.getPreviousOrders(orders).map((ord) => {
                            return <Order key={ord.id}
                                orderId={ord.id}
                                userId={ord.userId}
                                productId={ord.productId}
                                productName={ord.product.productName}
                                price={ord.product.price}
                                quantity={ord.quantity}
                                isPaymentCompleted={ord.isPaymentCompleted}
                                onBuyNowClick={onBuyNowClick}
                                onDeleteClick={onDeleteClick} />
                        })}
                    </div>
                    <div className="col-lg-6">
                        <h4 className="py-2 my-2 text-danger border-bottom border-danger">
                            <i className="fa fa-shopping-cart"></i> Cart <span className="badge bg-danger">{OrdersService.getCart(orders).length}</span>
                        </h4>
                        {orderPlacedAlert && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                Your Order has been placed!
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}
                        {orderDeletedAlert && (
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                Your item has been removed from the cart!
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}
                        {OrdersService.getCart(orders).length === 0 ? (<div className="text-danger"> Cart Empty </div>) : ("")}
                        {OrdersService.getCart(orders).map((ord) => {
                            return <Order key={ord.id}
                                orderId={ord.id}
                                userId={ord.userId}
                                productId={ord.productId}
                                productName={ord.product.productName}
                                price={ord.product.price}
                                quantity={ord.quantity}
                                isPaymentCompleted={ord.isPaymentCompleted}
                                onBuyNowClick={onBuyNowClick}
                                onDeleteClick={onDeleteClick} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard