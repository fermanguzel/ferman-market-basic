import React, { useState, useEffect, useMemo } from 'react';
import { BrandsService, CategoriesService, SortService } from './Service';

let ProductsList = () => {

    let [products, setProducts] = useState([]);
    let [originalProducts, setOriginalProducts] = useState([]);
    let [search, setSearch] = useState("");
    let [sortBy, setSortBy] = useState("productName");
    let [sortOrder, setSortOrder] = useState("ASC");
    let [brands, setBrands] = useState([]);
    let [selectedBrand, setSelectedBrand] = useState("");

    useEffect(() => {
        (async () => {
            let brandsResponse = await BrandsService.fetchBrands();
            let brandsResponseBody = await brandsResponse.json();
            setBrands(brandsResponseBody);

            let categoriesResponse = await CategoriesService.fetchCategories();
            let categoriesResponseBody = await categoriesResponse.json();

            let productsResponse = await fetch(`http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`, { method: "GET" });
            let productsResponseBody = await productsResponse.json();

            productsResponseBody.forEach(product => {
                product.brand = BrandsService.getBrandByBrandId(brandsResponseBody, product.brandId);
                product.category = CategoriesService.getCategoryByCategoryId(categoriesResponseBody, product.categoryId);
            });

            setProducts(productsResponseBody);
            setOriginalProducts(productsResponseBody);
        })();
    }, [search]);

    let filteredProducts = useMemo(() => {
        return originalProducts.filter((prod) => prod.brand.brandName.indexOf(selectedBrand) >= 0);
    }, [originalProducts, selectedBrand]);

    let onSortColumnNameClick = (event, columnName) => {
        event.preventDefault();
        setSortBy(columnName);
        let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
        setSortOrder(negatedSortOrder);
    };

    useEffect(() => {
        setProducts(SortService.getSortedArray(filteredProducts, sortBy, sortOrder));
    }, [filteredProducts, sortBy, sortOrder]);

    let getColumnHeader = (columnName, displayName) => {
        return (
            <React.Fragment>
                <a href="/#" onClick={(event) => {
                    onSortColumnNameClick(event, columnName);
                }}>
                    {displayName}
                </a> &nbsp;
                {sortBy === columnName && sortOrder === "ASC" ? (
                    <i className="fa fa-sort-up"></i>
                ) : (
                    ""
                )}
                {sortBy === columnName && sortOrder === "DESC" ? (
                    <i className="fa fa-sort-down"></i>
                ) : (
                    ""
                )}
            </React.Fragment>
        )
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="row p-3 header">
                    <div className="col-lg-3">
                        <h4><i className="fa fa-suitcase"></i> Products &nbsp; <span className="badge bg-secondary">{products.length}</span></h4>
                    </div>

                    <div className="col-lg-6">
                        <input type="search"
                            className="form-control"
                            placeholder="Search products..."
                            autoFocus="autoFocus"
                            value={search}
                            onChange={(event) => { setSearch(event.target.value) }} />
                    </div>
                    <div className="col-lg-3">
                        <select className="form-control"
                            value={selectedBrand}
                            onChange={(event) => { setSelectedBrand(event.target.value) }} >
                            <option value="">Select Brands</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="col-lg-10 mx-auto mb-2">
                <div className="card my-2 shadow">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>{getColumnHeader("productName", "Product Name")}</th>
                                    <th>{getColumnHeader("price", "Price")}</th>
                                    <th>{getColumnHeader("brand", "Brand")}</th>
                                    <th>{getColumnHeader("category", "Category")}</th>
                                    <th>{getColumnHeader("rating", "Rating")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.brand.brandName}</td>
                                        <td>{product.category.categoryName}</td>
                                        <td>
                                            {[...Array(product.rating).keys()].map((n) => {
                                                return <i className="fa fa-star text-warning" key={n}></i>;
                                            })}
                                            {[...Array(5 - product.rating).keys()].map((n) => {
                                                return <i className="fa fa-star-o text-warning" key={n}></i>;
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList