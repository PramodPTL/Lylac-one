import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import PropTypes from 'prop-types';

export const ShopContext = createContext();

const PRODUCT_LIST_ENDPOINT = "/api/product/user/list";
const CART_ADD_ENDPOINT = "/api/cart/add";
const CART_UPDATE_ENDPOINT = "/api/cart/update";
const CART_GET_ENDPOINT = "/api/cart/get";
const PRODUCT_DETAILS_ENDPOINT = "/api/product";

// Creates the default cart shape used by the app.
const getDefaultCartItem = (quantity = 1) => ({
    quantity,
    selectedPrice: null,
    isPackage: false
});

// Normalizes cart data so both legacy and newer formats are handled consistently.
const normalizeCartData = (cartData = {}) => {
    const normalizedCartData = { ...cartData };

    Object.entries(normalizedCartData).forEach(([itemId, item]) => {
        if (item === null || item === undefined) {
            delete normalizedCartData[itemId];
            return;
        }

        if (typeof item === "number") {
            normalizedCartData[itemId] = getDefaultCartItem(item);
            return;
        }

        if (typeof item === "object") {
            normalizedCartData[itemId] = {
                ...getDefaultCartItem(),
                ...item,
                quantity: item.quantity ?? 1,
                selectedPrice: item.selectedPrice ?? null,
                isPackage: item.isPackage ?? false
            };
        }
    });

    return normalizedCartData;
};

// Applies the standard product list response format to shared state.
const updateProductsFromResponse = (responseData, setProductsState, setProductsPaginationState) => {
    if (!responseData?.success) {
        toast.error(responseData?.message);
        return false;
    }

    setProductsState(responseData.products);
    setProductsPaginationState({
        total: responseData.pagination.total,
        pages: responseData.pagination.pages,
        currentPage: responseData.pagination.currentPage,
        limit: responseData.pagination.limit
    });
    return true;
};

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 35;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItem] = useState({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsPagination, setProductsPagination] = useState({
        total: 0,
        pages: 0,
        currentPage: 1,
        limit: 20
    });
    const [filters, setFilters] = useState({
        category: [],
        subCategory: [],
        search: '',
        sortBy: 'date',
        sortOrder: 'desc'
    });
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Function to update filters and fetch products
    const updateFilters = (newFilters) => {
        // Create new filters by merging existing filters with new ones
        const updatedFilters = {
            ...filters,
            ...newFilters
        };

        // Update the filters state
        setFilters(updatedFilters);

        // Reset to page 1 when filters change
        setProductsPagination(prev => ({
            ...prev,
            currentPage: 1
        }));

        // Force a data fetch right away instead of relying on the useEffect
        fetchProductsWithCurrentFilters(updatedFilters);
    };

    // A helper function to immediately fetch with the given filters
    const fetchProductsWithCurrentFilters = async (currentFilters) => {
        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}${PRODUCT_LIST_ENDPOINT}`, {
                page: 1,
                limit: productsPagination.limit,
                ...currentFilters,
                search: currentFilters.search || search
            });

            updateProductsFromResponse(response.data, setProducts, setProductsPagination);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to set page for pagination
    const setPage = (page) => {
        if (page < 1 || page > productsPagination.pages) return;

        const newPage = parseInt(page);

        setProductsPagination(prev => ({
            ...prev,
            currentPage: newPage
        }));

        // Fetch the data for the new page
        fetchProductsForPage(newPage);
    };

    // Helper function to fetch products for a specific page
    const fetchProductsForPage = async (page) => {
        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}${PRODUCT_LIST_ENDPOINT}`, {
                page,
                limit: productsPagination.limit,
                ...filters,
                search: filters.search || search
            });

            updateProductsFromResponse(response.data, setProducts, setProductsPagination);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (itemId, itemData) => {
        // Convert old format to new format if needed
        const cartData = typeof itemData === 'number' ? getDefaultCartItem(itemData) : itemData;

        // Validate cart data
        if (!cartData || typeof cartData !== 'object') {
            console.error('Invalid cart data');
            return;
        }

        // Ensure quantity exists and is a number
        if (!cartData.quantity || isNaN(cartData.quantity)) {
            cartData.quantity = 1;
        }

        // Find the product to check for minimum order quantity
        const product = products.find(p => p._id === itemId);
        if (!product) {
            console.error('Product not found');
            return;
        }

        // Ensure quantity meets minimum order quantity if not a package
        if (!cartData.isPackage) {
            const minQuantity = product.minOrderQuantity || 1;
            if (cartData.quantity < minQuantity) {
                toast.error(`Minimum order quantity for this product is ${minQuantity}`);
                cartData.quantity = minQuantity;
            }
        }

        try {
            let newCartItems = structuredClone(cartItems);
            newCartItems[itemId] = cartData;
            setCartItem(newCartItems);
            toast.success('Item Added to Cart');

            if (token) {
                await axios.post(`${backendUrl}${CART_ADD_ENDPOINT}`, {
                    itemId,
                    cartData
                }, {
                    headers: { token }
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error(error.message || 'Error adding item to cart');
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(item => {
            if (!item) return;

            if (typeof item === 'object' && item.quantity > 0) {
                totalCount += item.quantity;
            } else if (typeof item === 'number' && item > 0) {
                totalCount += item;
            }
        });
        return totalCount;
    }

    const getTypeOfProductsAddedInCart = () => {
        // Count the number of unique product IDs in the cart
        return Object.keys(cartItems).filter(itemId => {
            const item = cartItems[itemId];
            // Only count items that exist and have positive quantity
            if (!item) return false;

            const quantity = typeof item === 'object' ? item.quantity : item;
            return quantity > 0;
        }).length;
    }

    const updateQuantity = async (itemId, itemData) => {
        try {
            // Convert old format to new format if needed
            const cartData = typeof itemData === 'number' ? getDefaultCartItem(itemData) : itemData;

            // Validate cart data
            if (!cartData || typeof cartData !== 'object') {
                console.error('Invalid cart data');
                return;
            }

            // If quantity is 0 or invalid, remove from cart
            if (!cartData.quantity || cartData.quantity === 0) {
                let newCartItems = structuredClone(cartItems);
                delete newCartItems[itemId];
                setCartItem(newCartItems);

                if (token) {
                    await axios.post(`${backendUrl}${CART_UPDATE_ENDPOINT}`, {
                        itemId,
                        cartData: { quantity: 0 }
                    }, {
                        headers: { token }
                    });
                }
                return;
            }

            // Find the product to check for minimum order quantity
            const product = products.find(p => p._id === itemId);
            if (!product) {
                console.error('Product not found');
                return;
            }

            // Ensure quantity meets minimum order quantity if not a package
            if (!cartData.isPackage) {
                const minQuantity = product.minOrderQuantity || 1;
                if (cartData.quantity < minQuantity) {
                    toast.error(`Minimum order quantity for this product is ${minQuantity}`);
                    cartData.quantity = minQuantity;
                }
            }

            let newCartItems = structuredClone(cartItems);
            newCartItems[itemId] = cartData;
            setCartItem(newCartItems);

            if (token) {
                await axios.post(`${backendUrl}${CART_UPDATE_ENDPOINT}`, {
                    itemId,
                    cartData
                }, {
                    headers: { token }
                });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error(error.message || 'Error updating quantity');
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            if (!item) continue;

            if (typeof item === 'object' && item.isPackage && item.selectedPrice) {
                // For package items, just add the package price (no multiplication)
                totalAmount += parseFloat(item.selectedPrice);
            } else {
                // For regular items, multiply price by quantity
                const quantity = typeof item === 'object' ? item.quantity : item;
                if (quantity <= 0) continue;

                const product = products.find((p) => p._id === itemId);
                const price = product ? parseFloat(product.price) : 0;
                totalAmount += price * quantity;
            }
        }
        return Math.round(totalAmount * 100) / 100; // Round to 2 decimal places
    }

    // Helper function to get individual item total
    const getItemTotal = (itemId) => {
        const item = cartItems[itemId];
        if (!item) return 0;

        if (typeof item === 'object' && item.isPackage && item.selectedPrice) {
            // For package items, return package price
            return parseFloat(item.selectedPrice);
        } else {
            // For regular items, multiply price by quantity
            const quantity = typeof item === 'object' ? item.quantity : item;
            const product = products.find((p) => p._id === itemId);
            const price = product ? parseFloat(product.price) : 0;
            return price * quantity;
        }
    }

    // Get products with filters and pagination
    const getProductsData = async (initialLoad = false) => {
        try {
            setLoading(true);

            // If it's the initial load, just get featured products
            if (initialLoad) {
                const featuredResponse = await axios.post(`${backendUrl}${PRODUCT_LIST_ENDPOINT}`, {
                    limit: 10,
                    bestseller: true,
                    sortBy: 'date',
                    sortOrder: 'desc'
                });

                if (featuredResponse.data.success) {
                    setFeaturedProducts(featuredResponse.data.products);
                }
                setLoading(false);
                return;
            }

            const response = await axios.post(`${backendUrl}${PRODUCT_LIST_ENDPOINT}`, {
                page: productsPagination.currentPage,
                limit: productsPagination.limit,
                ...filters,
                search: filters.search || search
            });

            updateProductsFromResponse(response.data, setProducts, setProductsPagination);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get a specific product by ID
    const getProductById = async (productId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}${PRODUCT_DETAILS_ENDPOINT}/${productId}`);
            if (response.data.success) {
                return response.data.product;
            }

            toast.error(response.data.message);
            return null;
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    // Get related products
    const getRelatedProducts = async (category, subCategory, excludeId, limit = 5) => {
        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}${PRODUCT_LIST_ENDPOINT}`, {
                category,
                subCategory,
                excludeId,
                limit,
                sortBy: 'date',
                sortOrder: 'desc'
            });

            if (response.data.success) {
                return response.data.products;
            }

            return [];
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}${CART_GET_ENDPOINT}`, {}, { headers: { token } });
            if (response.data.success) {
                const normalizedCartData = normalizeCartData(response.data.cartData || {});
                setCartItem(normalizedCartData);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const getCartItems = () => {
        const items = [];
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            if (!item) continue;

            const product = products.find(p => p._id === itemId);
            if (!product) continue;

            const quantity = typeof item === 'object' ? item.quantity : item;
            if (quantity <= 0) continue;

            const price = typeof item === 'object' && item.selectedPrice
                ? item.selectedPrice
                : product.price;

            items.push({
                _id: itemId,
                name: product.name,
                price: price,
                image: product.image[0],
                quantity: quantity,
                isPackage: typeof item === 'object' ? item.isPackage : false
            });
        }
        return items;
    }

    useEffect(() => {
        // On initial load, fetch featured products
        getProductsData(true);
    }, []);

    // Listen for changes in filters and pagination to fetch products
    useEffect(() => {
        if (showSearch || (filters.category.length > 0) || (filters.subCategory.length > 0) ||
            filters.search || productsPagination.currentPage > 1) {
            getProductsData();
        }
    }, [filters, productsPagination.currentPage, showSearch]);

    // Apply search when search box is used
    useEffect(() => {
        if (showSearch) {
            updateFilters({ search });
        }
    }, [search, showSearch]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products, featuredProducts, loading, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItem,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, getCartItems, getItemTotal,
        filters, updateFilters,
        pagination: productsPagination,
        setPage,
        getProductById,
        getRelatedProducts,
        getTypeOfProductsAddedInCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ShopContextProvider;

