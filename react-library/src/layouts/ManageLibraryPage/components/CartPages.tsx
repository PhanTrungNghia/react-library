import React, { useEffect, useRef, useState } from 'react';
import OrderModel from '../../../models/OrderModel';
import { Pagination } from '../../Utils/Pagination';
import { CartPage } from './CartPage';
import { Console } from 'console';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';

export const CartPages = () => {

    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [orderDelete, setOrderDelete] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/orders?page=${currentPage - 1}&size=${ordersPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.orders;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedOrders: OrderModel[] = [];

            for (const key in responseData) {
                loadedOrders.push({
                    id: responseData[key].id,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    userName: responseData[key].userName,
                    userEmail: responseData[key].userEmail,
                    paymentMethod: responseData[key].paymentMethod,
                    status: responseData[key].status,
                    createDate: responseData[key].createDate,
                    userAddress: responseData[key].userAddress,
                    totalCash: responseData[key].totalCash
                });
            }

            setOrders(loadedOrders);
            setIsLoading(false);
        };
        fetchOrders().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, orderDelete]);

    const indexOfLastOrder: number = currentPage * ordersPerPage;
    const indexOfFirstOrder: number = indexOfLastOrder - ordersPerPage;
    let lastItem = ordersPerPage * currentPage <= totalAmountOfBooks ?
        ordersPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteOrder = () => setOrderDelete(!orderDelete);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            {totalAmountOfBooks > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfBooks})</h3>
                    </div>
                    <p>
                        {indexOfFirstOrder + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    <h3>Order</h3>
                    {orders.map(order => (
                        <div className='container'>
                            <CartPage order={order} deleteOrder={deleteOrder} key={order.id} />
                        </div>
                    ))
                    }
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}
