import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = ({ closeCheckout, price, noOfItems }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const closeModal = () => {
        closeCheckout();
    };

    const checkout = () => {
        axios
            .post(
                'http://localhost:8000/api/sales/addSale',
                {
                    email: user.email,
                    price,
                    userID: user._id,
                    address: user.address,
                    noOfItems,
                },
                { headers: { 'auth-token': token } }
            )
            .then((res) => {
                axios.put(
                    'http://localhost:8000/api/users/cart/emptyCart',
                    {},
                    {
                        headers: { 'auth-token': token },
                    }
                );
            })
            .then((res) => {
                axios
                    .get(
                        `http://localhost:8000/api/users/${user._id}/getUser`,
                        { headers: { 'auth-token': token } }
                    )
                    .then((res) => {
                        dispatch({ type: 'SET_CART', payload: res.data.cart });
                        closeModal();
                    });
            })
            .then((res) => {
                cart.map((product) => {
                    axios.put(
                        `http://localhost:8000/api/items/${product.itemID}/decreaseStock`,
                        { count: product.count },
                        { headers: { 'auth-token': token } }
                    );
                    return product;
                });
            })
            .then((res) => {
                axios.get('http://localhost:8000/api/items').then((res) => {
                    dispatch({ type: 'SET_ITEMS', payload: res.data });
                });
            });
    };

    return (
        <div className='modal'>
            <div className='modal__container view'>
                <span className='close' onClick={closeModal}>
                    X
                </span>
                <p>Price: Php {price}</p>
                <p>Address: {user.address}</p>
                <p>No. of Items: {noOfItems}</p>
                <button className='btn btn-accent' onClick={checkout}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Checkout;
