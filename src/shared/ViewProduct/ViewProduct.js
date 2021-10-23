import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ViewProduct = ({ item, setIsViewProductOpen }) => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const history = useHistory();
    const dispatch = useDispatch();

    const closeViewProduct = () => {
        setIsViewProductOpen(false);
    };

    const addToCart = (e) => {
        e.preventDefault();
        if (Object.keys(user).length === 0) {
            history.push('/login');
        } else {
            if (
                cart.find((cartItem) => cartItem.itemID === item._id)?.count ===
                item.stock
            ) {
                return;
            }
            axios
                .put(
                    'http://localhost:8000/api/users/cart/addToCart',
                    {
                        itemID: item._id,
                    },
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

    return (
        <div className='modal'>
            <form className='modal__container view'>
                <span onClick={closeViewProduct} className='close'>
                    X
                </span>
                <div className='view__head'>
                    <div className='img'>
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className='desc'>
                        <h3>{item.name}</h3>
                        <h4>Php {item.price}</h4>
                        <button className='btn btn-accent' onClick={addToCart}>
                            Add To Cart
                        </button>
                    </div>
                </div>
                <div className='view__body'>
                    <p>{item.description}</p>
                </div>
            </form>
        </div>
    );
};

export default ViewProduct;
