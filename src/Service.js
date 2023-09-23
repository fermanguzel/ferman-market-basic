export const OrdersService = {
    getPreviousOrders: (orders) => {
        return orders.filter((ord) => ord.isPaymentCompleted === true);
    },
    getCart: (orders) => {
        return orders.filter((ord) => ord.isPaymentCompleted === false);
    },
};

export const ProductsService = {
    getProductByProductId: (products, productId) => {
        return products.find((prod) => prod.id === productId);
    },
    fetchProducts: () => {
        return fetch("http://localhost:5000/products", { method: "GET" });
    }
}

export const BrandsService = {
    fetchBrands: () => {
        return fetch("http://localhost:5000/brands", { method: "GET" });
    },
    getBrandByBrandId: (brands, brandId) => {
        return brands.find((brand) => (brand.id === brandId));
    }
}

export const CategoriesService = {
    fetchCategories: () => {
        return fetch("http://localhost:5000/categories", { method: "GET" });
    },
    getCategoryByCategoryId: (categories, categoryId) => {
        return categories.find((category) => (category.id === categoryId));
    }
}

export const SortService = {
    getSortedArray: (elements, sortBy, sortOrder) => {
        if (!elements) {
            return elements;
        }

        let array = [...elements];

        array.sort((a, b) => {
            if (a[sortBy] && b[sortBy]) {
                return a[sortBy].toString().toLowerCase() - b[sortBy].toString().toLowerCase();
            } else {
                return 0;
            }
        });
        if (sortOrder === "DESC") {
            array.reverse();
        }

        return array;
    }
}