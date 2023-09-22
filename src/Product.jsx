import React, { useState } from 'react'

let Product = (props) => {
    let [prod] = useState(props.product);
    return (
        <div className="col-lg-6">
            <div className="card m-1">
                <div className="card-body">
                    <h5>
                        <i className="fa fa-arrow-right"></i> {prod.productName}
                    </h5>
                    <div>₺ {prod.price.toFixed(2)} </div>
                    <div className="mt-2 text-muted">
                        #{prod.brand.brandName} #{prod.category.categoryName}
                    </div>
                    <div>
                        {[...Array(prod.rating).keys()].map((n) => {
                            return <i className="fa fa-star text-warning" key={n}></i>;
                        })}
                        {[...Array(5 - prod.rating).keys()].map((n) => {
                            return <i className="fa fa-star-o text-warning" key={n}></i>;
                        })}
                    </div>
                    <div className="float-end">
                        {prod.isOrdered ? (
                            <span className="text-primary">Added to Cart!</span>
                        ) : (
                            <button className="btn btn-sm btn-success" onClick={() => { props.onAddToCartClick(prod) }} >
                                <i className="fa fa-cart-plus"></i> Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product