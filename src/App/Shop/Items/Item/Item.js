import { useState } from 'react';
import ViewProduct from 'shared/ViewProduct';

const Item = ({ item }) => {
    const [isViewProductOpen, setIsViewProductOpen] = useState(false);

    const openViewProduct = () => {
        setIsViewProductOpen(true);
    };

    return (
        <>
            <div className='shop__container'>
                <div className='card'>
                    <div className='card__head'>
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className='card__body'>
                        <div className='description'>
                            <h3>{item.name}</h3>
                            <h4>{item.price} Php</h4>
                        </div>
                        <div className='buttons'>
                            <div className='btn btn-accent'>Add to Cart</div>
                            <div
                                className='btn btn-border-accent'
                                onClick={openViewProduct}
                            >
                                View
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isViewProductOpen && (
                <ViewProduct
                    item={item}
                    setIsViewProductOpen={setIsViewProductOpen}
                />
            )}
        </>
    );
};

export default Item;
