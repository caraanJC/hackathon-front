import Navbar from 'shared/Navbar';

const Cart = () => {
    return (
        <>
            <Navbar />
            <div className='cart'>
                <div className='products'>
                    <div className='products__head'>
                        <h2>Shopping cart</h2>
                    </div>
                    <div className='products__body'>
                        <div className='product'>
                            <div className='product__img'>
                                <img src='' alt='' />
                            </div>
                            <div className='product__desc'>
                                <h3>Name</h3>
                                <p>Php300</p>
                                <p>desc</p>
                                <div className='qty'>
                                    <button>-</button>
                                    <input
                                        type='number'
                                        name=''
                                        id=''
                                        value='1'
                                    />
                                    <button>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='product'>
                            <div className='product__img'>
                                <img src='' alt='' />
                            </div>
                            <div className='product__desc'>
                                <h3>Name</h3>
                                <p>Php300</p>
                                <p>desc</p>
                                <div className='qty'>
                                    <button>-</button>
                                    <input
                                        type='number'
                                        name=''
                                        id=''
                                        value='1'
                                    />
                                    <button>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='payment'>
                    <div className='btn btn-accent'>Go to Checkout</div>
                    <div className='btn btn-paypal'>
                        <img src='' alt='' />
                    </div>

                    <h3>Order Summary:</h3>
                    <p>Subtotal: 300Php</p>
                    <p>Shipping: free</p>
                    <hr />

                    <h2>Total: 300Php</h2>
                </div>
            </div>
        </>
    );
};

export default Cart;
