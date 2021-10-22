import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        console.log(cart);
    }, [cart]);
    return <div>Cart</div>;
};

export default Cart;
