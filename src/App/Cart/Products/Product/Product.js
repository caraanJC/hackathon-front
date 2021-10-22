import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product, count }) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const items = useSelector((state) => state.items);

    const dispatch = useDispatch();

    const decreaseQuantity = () => {
        if (count === 1) {
            axios
                .put(
                    'http://localhost:8000/api/users/cart/deleteItem',
                    { itemID: product._id },
                    { headers: { 'auth-token': token } }
                )
                .then((res) => {
                    axios
                        .get(
                            `http://localhost:8000/api/users/${user._id}/getUser`,
                            { headers: { 'auth-token': token } }
                        )
                        .then((res) => {
                            dispatch({
                                type: 'SET_CART',
                                payload: res.data.cart,
                            });
                        });
                });
        } else {
            axios
                .put(
                    'http://localhost:8000/api/users/cart/decreaseCount',
                    { itemID: product._id },
                    { headers: { 'auth-token': token } }
                )
                .then((res) => {
                    axios
                        .get(
                            `http://localhost:8000/api/users/${user._id}/getUser`,
                            { headers: { 'auth-token': token } }
                        )
                        .then((res) => {
                            dispatch({
                                type: 'SET_CART',
                                payload: res.data.cart,
                            });
                        });
                });
        }
    };

    const increaseQuantity = () => {
        if (items.find((item) => item._id === product._id).stock === count) {
            return;
        }
        axios
            .put(
                'http://localhost:8000/api/users/cart/increaseCount',
                { itemID: product._id },
                { headers: { 'auth-token': token } }
            )
            .then((res) => {
                axios
                    .get(
                        `http://localhost:8000/api/users/${user._id}/getUser`,
                        { headers: { 'auth-token': token } }
                    )
                    .then((res) => {
                        dispatch({
                            type: 'SET_CART',
                            payload: res.data.cart,
                        });
                    });
            });
    };
    return (
        <div className='product'>
            <div className='product__img'>
                <img src={product.image} alt={product.name} />
            </div>
            <div className='product__desc'>
                <h3>{product.name}</h3>
                <p>Php {product.price}</p>

                <div className='qty'>
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{count}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <p>Total: Php {count * product.price}</p>
            </div>
        </div>
    );
};

export default Product;
