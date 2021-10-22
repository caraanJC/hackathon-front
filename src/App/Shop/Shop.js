import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProduct from '../../shared/AddProduct/AddProduct';
import Navbar from '../../shared/Navbar';
import Items from './Items';

const Shop = () => {
    const isAddProductOpen = useSelector((state) => state.isAddProductOpen);
    const cart = useSelector((state) => state.cart);
    const items = useSelector((state) => state.items);
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            cart.map((cartItem) => {
                if (!items.find((item) => item._id === cartItem.itemID)) {
                    axios.put(
                        'http://localhost:8000/api/users/cart/deleteItem',
                        { itemID: cartItem.itemID },
                        { headers: { 'auth-token': token } }
                    );
                }
                return cartItem;
            });
        }
        //eslint-disable-next-line
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8000/api/items/').then((res) => {
            dispatch({ type: 'SET_ITEMS', payload: res.data });
        });
    }, [dispatch]);
    return (
        <div className='shop'>
            <Navbar />
            <Items />
            {isAddProductOpen && <AddProduct />}
        </div>
    );
};

export default Shop;
