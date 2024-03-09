import { useOktaAuth } from "@okta/okta-react";
import OrderModel from "../../../models/OrderModel";

export const CartPage: React.FC<{
    order: OrderModel, deleteOrder: any
}> = (props, key) => {

    const { authState } = useOktaAuth();

    async function deleteBook() {
        const url = `${process.env.REACT_APP_API}/admin/secure/delete/order?orderId=${props.order?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteOrder();
    }

    return (
        
        <div className="CartPage-container" key={props.order.id}>
            <div>
                <ul>
                    <li className="Order-item" key={props.order.id}>
                        <div>ID: {props.order.id}</div>
                        <div>User Name: {props.order.firstName + " " + props.order.lastName}</div>
                        <div>Email: {props.order.userEmail}</div>
                        <div>Address: {props.order.userAddress}</div>
                        <div>Payment Method: {props.order.paymentMethod}</div>
                        <div>Status: {props.order.status}</div>
                        <div>Total Cash: ${props.order.totalCash}</div>
                        <div>Create Date: {props.order.createDate}</div>
                        <button className='m-1 btn btn-md' onClick={deleteBook}>Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}