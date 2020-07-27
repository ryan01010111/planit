import React from 'react';

const OrdersTable = ({ orders }) => {
    const formatDate = str => (new Date(str)).toLocaleDateString();

    return (
        <div className="table-container">
            <table id="my-orders">
                <thead>
                    <tr>
                        <th scope="col">Order No.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Item</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {orders.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{formatDate(item.timestamp)}</td>
                                <td>{item.item}</td>
                                <td>${item.total}</td>
                                {item.status === 'AP' && <td className="incomplete">Awaiting payment</td>}
                                {item.status === 'PS' && <td className="complete">Complete</td>}
                                {item.status === 'PF' && <td className="failed">Payment failed</td>}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable;
