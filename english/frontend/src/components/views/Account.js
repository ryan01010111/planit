import React, { Fragment, useState, useEffect } from 'react';
import Auth from '../auth';
import Loading from './Loading';
import OrdersTable from './OrdersTable';

const Account = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/my_orders', {
                method: 'GET',
                headers: Auth.headerTemplate()
            })
            const data = await res.json();
            setOrders(data);
        }
        fetchData();
    }, []);

    return !orders
        ? <Loading />
        : (
            <div id="account-container">
                <h1>My Account</h1>
                <h3>My Orders</h3>
                <OrdersTable
                    orders={orders}
                />
            </div>
        )
}

export default Account;
