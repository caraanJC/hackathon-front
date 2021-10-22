import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storage } from '../../base';

import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import axios from 'axios';

const AddProduct = () => {
    const token = useSelector((state) => state.token);
    const items = useSelector((state) => state.items);

    const dispatch = useDispatch();

    const [newItem, setNewItem] = useState({
        name: '',
        price: 100,
        description: '',
        file: '',
        stock: 10,
    });

    const closeAddProduct = () => {
        dispatch({ type: 'SET_IS_ADD_PRODUCT_OPEN', payload: false });
    };

    const changeInput = (e) => {
        if (e.target.name === 'file') {
            setNewItem({ ...newItem, file: e.target.files[0] });
        } else {
            setNewItem({ ...newItem, [e.target.name]: e.target.value });
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (items.find((item) => item.name === newItem.name))
            return alert('Already in items');

        const itemImagesRef = ref(
            storage,
            `items/images/${newItem?.name}/${newItem?.file?.name}`
        );

        uploadBytes(itemImagesRef, newItem.file).then((snapshot) => {
            getDownloadURL(itemImagesRef).then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                axios
                    .post(
                        'http://localhost:8000/api/items/addItem',
                        {
                            name: newItem.name,
                            price: newItem.price,
                            description: newItem.description,
                            stock: newItem.stock,
                            image: url,
                        },
                        { headers: { 'auth-token': token } }
                    )
                    .then((res) => {
                        axios
                            .get('http://localhost:8000/api/items')
                            .then((res) => {
                                dispatch({
                                    type: 'SET_ITEMS',
                                    payload: res.data,
                                });
                                setNewItem({
                                    name: '',
                                    price: 100,
                                    description: '',
                                    file: '',
                                    stock: 10,
                                });
                                closeAddProduct();
                            });
                    });
            });
        });
    };

    return (
        <div className='modal'>
            <div className='modal__container add'>
                <span onClick={closeAddProduct} className='close'>
                    X
                </span>
                <div className='add__head'>
                    <h3>Add Item</h3>
                </div>
                <form className='add__body' onSubmit={submitForm}>
                    <div className='input'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            value={newItem.name}
                            onChange={changeInput}
                            name='name'
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='price'>Price:</label>
                        <input
                            type='number'
                            id='price'
                            value={newItem.price}
                            onChange={changeInput}
                            name='price'
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='stock'>Stock:</label>
                        <input
                            type='number'
                            id='stock'
                            value={newItem.stock}
                            onChange={changeInput}
                            name='stock'
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='desc'>Description:</label>
                        <textarea
                            id='desc'
                            value={newItem.description}
                            onChange={changeInput}
                            name='description'
                            required
                        ></textarea>
                    </div>
                    <div className='input'>
                        <label htmlFor='file'>Image:</label>
                        <input
                            type='file'
                            id='file'
                            accept='image/png, image/jpeg'
                            onChange={changeInput}
                            name='file'
                            required
                        />
                    </div>
                    <button className='btn btn-accent'>Add Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
