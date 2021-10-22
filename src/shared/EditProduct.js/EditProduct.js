import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storage } from '../../base';

import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import axios from 'axios';

const EditProduct = ({ closeEditProduct, item }) => {
    const token = useSelector((state) => state.token);
    const items = useSelector((state) => state.items);

    const dispatch = useDispatch();

    const [itemToEdit, setItemToEdit] = useState({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        stock: item.stock,
        file: '',
    });

    const [editImage, setEditImage] = useState(false);

    const openFileUpload = (e) => {
        e.preventDefault();
        setEditImage(true);
    };

    const closeFileUpload = (e) => {
        e.preventDefault();
        setItemToEdit({
            ...itemToEdit,
            file: '',
        });
        setEditImage(false);
    };

    const changeInput = (e) => {
        if (e.target.name === 'file') {
            setItemToEdit({ ...itemToEdit, file: e.target.files[0] });
        } else {
            setItemToEdit({ ...itemToEdit, [e.target.name]: e.target.value });
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (
            items
                .filter((product) => product._id !== item._id)
                .find((item) => item.name === itemToEdit.name)
        )
            return alert('Has a duplicate');

        if (itemToEdit.file) {
            const itemImagesRef = ref(
                storage,
                `items/images/${itemToEdit?.name}/${itemToEdit?.file?.name}`
            );

            uploadBytes(itemImagesRef, itemToEdit.file).then((snapshot) => {
                getDownloadURL(itemImagesRef).then((url) => {
                    axios
                        .put(
                            `http://localhost:8000/api/items/${item._id}/editItem`,
                            {
                                name: itemToEdit.name,
                                price: itemToEdit.price,
                                description: itemToEdit.description,
                                stock: itemToEdit.stock,
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
                                    setItemToEdit({
                                        name: '',
                                        price: 100,
                                        description: '',
                                        file: '',
                                        stock: 10,
                                    });
                                    closeEditProduct();
                                });
                        });
                });
            });
        } else {
            axios
                .put(
                    `http://localhost:8000/api/items/${item._id}/editItem`,
                    {
                        name: itemToEdit.name,
                        price: itemToEdit.price,
                        description: itemToEdit.description,
                        stock: itemToEdit.stock,
                        image: itemToEdit.image,
                    },
                    { headers: { 'auth-token': token } }
                )
                .then((res) => {
                    axios.get('http://localhost:8000/api/items').then((res) => {
                        dispatch({
                            type: 'SET_ITEMS',
                            payload: res.data,
                        });
                        setItemToEdit({
                            name: '',
                            price: 100,
                            description: '',
                            file: '',
                            stock: 10,
                        });
                        closeEditProduct();
                    });
                });
        }
    };

    return (
        <div className='modal'>
            <div className='modal__container add'>
                <span onClick={closeEditProduct} className='close'>
                    X
                </span>
                <div className='add__head'>
                    <h3>Edit Item</h3>
                </div>
                <form className='add__body' onSubmit={submitForm}>
                    <div className='input'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            value={itemToEdit.name}
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
                            value={itemToEdit.price}
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
                            value={itemToEdit.stock}
                            onChange={changeInput}
                            name='stock'
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='desc'>Description:</label>
                        <textarea
                            id='desc'
                            value={itemToEdit.description}
                            onChange={changeInput}
                            name='description'
                            required
                        ></textarea>
                    </div>
                    <div className='input'>
                        <label htmlFor='file'>Image:</label>
                        <img src={item.image} alt={item.name} />
                        {!editImage ? (
                            <button
                                className='btn btn-accent'
                                onClick={openFileUpload}
                                style={{ marginTop: '10px', width: '30%' }}
                            >
                                Change Image
                            </button>
                        ) : (
                            <button
                                className='btn btn-accent'
                                style={{ marginBottom: '10px', width: '30%' }}
                                onClick={closeFileUpload}
                            >
                                Cancel
                            </button>
                        )}
                        {editImage && (
                            <input
                                type='file'
                                id='file'
                                accept='image/png, image/jpeg'
                                onChange={changeInput}
                                name='file'
                                required
                            />
                        )}
                    </div>
                    <button className='btn btn-accent'>Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
