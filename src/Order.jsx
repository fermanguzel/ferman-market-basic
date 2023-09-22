import React from 'react';

let Order = (props) => {
    return (
        <div className="card my-2 shadow">
            <div className="card-body">
                <h6><i className="fa fa-arrow-right"></i> {props.productName}
                    {!props.isPaymentCompleted && (
                        <div className="float-end">
                            <button className="btn btn-sm btn-success me-2"
                                onClick={() => { props.onBuyNowClick(props.orderId, props.userId, props.productId, props.quantity) }}>
                                <i className="fa fa-truck"></i> Buy Now
                            </button>
                            <button className="btn btn-sm btn-danger me-2"
                                onClick={() => { props.onDeleteClick(props.orderId) }} >
                                <i className="fa fa-trash-o"></i> Delete
                            </button>
                        </div>
                    )}
                </h6>
                <table className="table table-sm table-borderless mt-1">
                    <tbody>
                        <tr>
                            <td style={{ width: "100px" }}>Quantity:</td>
                            <td>{props.quantity}</td>
                        </tr>
                        <tr>
                            <td style={{ width: "100px" }}>Price:</td>
                            <td>₺ {props.price}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default React.memo(Order);