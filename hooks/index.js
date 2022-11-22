import {useEffect, useState} from "react";

export const useCart = () => {
    const [cart, setCart] = useState(0);

    const addToCart = (id) => {
        localStorage.setItem(id, id);

        setCart(cart => cart + 1);
    }

    const isAddedCart = (id) => {
        return  !!localStorage.getItem(id);
    }

    const removeFromCart = (id) => {
       localStorage.removeItem(id);

       setCart(cart => cart - 1);
    }

    return {addToCart, isAddedCart, removeFromCart, cart};
}

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        setLoading(true);

        const response = await fetch('https://dummyjson.com/products');

        const data = await response.json();

        setProducts(data.products);

        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return {products, loading};
}
