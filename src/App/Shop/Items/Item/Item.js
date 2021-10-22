import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewProduct from 'shared/ViewProduct';

import { GrEdit } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Item = ({ item }) => {
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);

<<<<<<< HEAD
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const history = useHistory();
    const dispatch = useDispatch();

    const openViewProduct = () => {
        setIsViewProductOpen(true);
    };

    const addToCart = () => {
        if (Object.keys(user).length === 0) {
            history.push('/login');
        } else {
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
                            {Object.keys(user).length > 0 &&
                            user.roles.includes('admin') ? (
                                <>
                                    <div className='btn btn-accent'>
                                        Edit <GrEdit />
                                    </div>
                                    <div className='btn btn-border-accent'>
                                        Delete <AiFillDelete />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className='btn btn-accent'
                                        onClick={addToCart}
                                    >
                                        Add to Cart
                                    </div>
                                    <div
                                        className='btn btn-border-accent'
                                        onClick={openViewProduct}
                                    >
                                        View
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
=======
  const openViewProduct = () => {
    setIsViewProductOpen(true);
  };

  return (
    <>
      <div className="card">
        <div className="card__head">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="card__body">
          <div className="description">
            <h3>{item.name}</h3>
            <h4>{item.price} Php</h4>
          </div>
          <div className="buttons">
            <div className="btn btn-accent">Add to Cart</div>
            <div className="btn btn-border-accent" onClick={openViewProduct}>
              View
>>>>>>> 4c574fda2c73689f3c0218f331ff5811b53c9476
            </div>
          </div>
        </div>
      </div>
      {isViewProductOpen && (
        <ViewProduct item={item} setIsViewProductOpen={setIsViewProductOpen} />
      )}
    </>
  );
};

export default Item;
