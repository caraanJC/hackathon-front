import { useSelector } from 'react-redux';
import Product from './Product';

const Products = () => {
    const cart = useSelector((state) => state.cart);
    const items = useSelector((state) => state.items);

    return (
        <div className='products'>
            <div className='products__head'>
                <h2>Shopping cart</h2>
            </div>
            <div className='products__body'>
                {cart.map((product) => (
                    <Product
                        key={product.itemID}
                        count={product.count}
                        product={items.find(
                            (item) => item._id === product.itemID
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
