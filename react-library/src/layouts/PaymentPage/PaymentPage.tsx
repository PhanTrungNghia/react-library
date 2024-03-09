import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import OrderRequest from "../../models/OrderRequest";
import BookModel from "../../models/BookModels";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PaymentPage = () => {

    const { authState } = useOktaAuth();

    // New Order
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [totalCash, setTotalCash] = useState(0);
    const [status, setStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Choose...');
    const [createDate, setCreateDate] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('Choose...');

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const bookId = (window.location.pathname).split('/')[2];

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
                price: responseJson.price
            };

            setBook(loadedBook);
            setTotalCash(loadedBook.price);
            setStatus('Processing...')
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    function paymentMethodField(value: string) {
        setPaymentMethod(value);
    }

    function deliveryMethodField(value: string) {
        setDeliveryMethod(value);
    }

    async function submitPayment() {
        const url = `${process.env.REACT_APP_API}/order/secure/add/order`;
        if (authState?.isAuthenticated && userName !== '' && firstName !== '' && lastName !== ''
            && totalCash >= 0 && status !== '' && paymentMethod !== ''
            && deliveryMethod !== '' && userAddress !== '') {

            const order: OrderRequest = new OrderRequest(
                firstName, lastName, userName, userEmail,
                paymentMethod, deliveryMethod, status,
                createDate, userAddress, totalCash
            );

            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            };

            const submitPaymentResponse = await fetch(url, requestOptions);
            if (!submitPaymentResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setUserName('');
            setFirstName('');
            setLastName('');
            setUserEmail('');
            setTotalCash(0);
            setStatus('');
            setPaymentMethod('');
            setCreateDate('');
            setUserAddress('');
            setDeliveryMethod('');
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

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
        <div className="maincontainer">
            <div className="container">
                <div className="py-5 text-center">
                    <h2>Luv 2 Read</h2>
                    <p className="lead">Thank you for purchasing.</p>
                </div>
                {displaySuccess &&
                    <div className='alert alert-success' role='alert'>
                        Book added successfully
                    </div>
                }
                {displayWarning &&
                    <div className='alert alert-danger' role='alert'>
                        All fields must be filled out
                    </div>
                }
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{book?.title}</h6>
                                    <small className="text-muted">{book?.description}</small>
                                </div>
                                <span className="text-muted">1</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${book?.price}</strong>
                            </li>
                        </ul>
                        <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" required
                                        onChange={e => setFirstName(e.target.value)} value={firstName} />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" required
                                        onChange={e => setLastName(e.target.value)} value={lastName} />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required
                                        onChange={e => setUserName(e.target.value)} value={userName} />
                                    <div className="invalid-feedback">
                                        Your username is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required
                                    onChange={e => setUserAddress(e.target.value)} value={userAddress} />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <hr className="mb-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="row">
                                <div className='col-4'>
                                    <div className='dropdown'>
                                        <label className='form-label' style={{ marginRight: '10px' }}> Payment Method</label>
                                        <button className='btn btn-secondary dropdown-toggle' type='button'
                                            id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                            aria-expanded='false'>
                                            {paymentMethod}
                                        </button>
                                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                            <li onClick={() => paymentMethodField('COD')}>
                                                <a className='dropdown-item'>
                                                    COD
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-4'>
                                    <div className='dropdown'>
                                        <label className='form-label' style={{ marginRight: '10px' }}> Delivery Method</label>
                                        <button className='btn btn-secondary dropdown-toggle' type='button'
                                            id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                            aria-expanded='false'>
                                            {deliveryMethod}
                                        </button>
                                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                            <li onClick={() => deliveryMethodField('Express')}>
                                                <a className='dropdown-item'>
                                                    Express Delivery
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block mb-4" type="button" onClick={submitPayment}>
                                Continue to checkout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}