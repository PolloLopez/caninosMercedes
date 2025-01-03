import React, { createContext, useState, useContext} from "react";

// crear contexto
const CartContext = createContext();

//hook personalizado para usar el contexto mas facil
export const useCart = () => {
    return useContext(CartContext);
};

//componente proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState ([]);

    //funcion para agregar producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    //funcion para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCart ((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    //funcion para vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};