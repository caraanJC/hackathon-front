import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../shared/Navbar';
import Checkout from './Checkout';
import Products from './Products';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const items = useSelector((state) => state.items);

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const openCheckout = () => {
        if (
            cart
                .map((product) => product.count)
                .reduce((prev, current) => {
                    return prev + current;
                }, 0) === 0
        )
            return;
        setIsCheckoutOpen(true);
    };
    const closeCheckout = () => {
        setIsCheckoutOpen(false);
    };

    return (
        <>
            <Navbar />
            <div className='cart'>
                <Products />

                <div className='payment'>
                    <div className='btn btn-accent' onClick={openCheckout}>
                        Go to Checkout
                    </div>
                    {/* <div className='btn btn-border-accent'>Paypal</div> */}

                    <h3>Order Summary:</h3>

                    <p>
                        Subtotal: Php{' '}
                        {cart
                            .map(
                                (product) =>
                                    items.find(
                                        (item) => item._id === product.itemID
                                    ).price * product.count
                            )
                            .reduce((prev, current) => {
                                return prev + current;
                            }, 0)}
                    </p>
                    <p>Shipping: free</p>
                    <hr />

                    <h2>
                        Total: Php{' '}
                        {cart
                            .map(
                                (product) =>
                                    items.find(
                                        (item) => item._id === product.itemID
                                    ).price * product.count
                            )
                            .reduce((prev, current) => {
                                return prev + current;
                            }, 0)}
                    </h2>
                </div>
            </div>
            {isCheckoutOpen && (
                <Checkout
                    closeCheckout={closeCheckout}
                    price={cart
                        .map(
                            (product) =>
                                items.find(
                                    (item) => item._id === product.itemID
                                ).price * product.count
                        )
                        .reduce((prev, current) => {
                            return prev + current;
                        }, 0)}
                    noOfItems={cart
                        .map((product) => product.count)
                        .reduce((prev, current) => {
                            return prev + current;
                        }, 0)}
                />
            )}
        </>
    );
};

export default Cart;
