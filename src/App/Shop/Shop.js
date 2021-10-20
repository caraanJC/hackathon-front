import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from 'shared/Navbar';
import Items from './Items';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:8000/api/items').then((res) => {
            dispatch({ type: 'SET_ITEMS', payload: res.data });
        });
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <Items />
        </div>
    );
};

export default Shop;
