import React, { useState, createContext } from 'react';

export const OrderContext = createContext();

export const OrderProvider = props => {
    const [order, setOrder] = useState(null);

    return (
        <OrderContext.Provider
            value={[order, setOrder]}
        >
            {props.children}
        </OrderContext.Provider>
    );
}
