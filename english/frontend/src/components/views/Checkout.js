import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { OrderContext } from '../contexts/OrderContext';

const promise = loadStripe("pk_test_hSnL9oGZKpHFAY42mSDHcE8L00kNUP7GSr");

const Checkout = ({ updatePurchased }) => {
    const [order, setOrder] = useContext(OrderContext);
    
    return !order
        ? (
            <Redirect to="/materials" />
        ) : (
            <Elements stripe={promise}>
                <img id="credit-cards-img" src="../../static/frontend/images/cards.png" alt="cards"/>
                <table id="order-info">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{order.title}</td>
                            <td><strong>${order.price}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <CheckoutForm
                    updatePurchased={updatePurchased}
                    itemID={order.id}
                />
            </Elements>
        )
}

// PropTypes
Checkout.propTypes = {
    updatePurchased: PropTypes.func.isRequired
}

export default Checkout;
