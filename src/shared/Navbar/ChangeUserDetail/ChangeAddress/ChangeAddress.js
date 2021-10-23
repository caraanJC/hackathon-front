import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChangeAddress = ({ closeModal }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const [newAddress, setNewAddress] = useState(user.address);

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .put(
                'http://localhost:8000/api/users/changeAddress',
                { address: newAddress },
                { headers: { 'auth-token': token } }
            )
            .then((res) =>
                axios
                    .get(
                        `http://localhost:8000/api/users/${user._id}/getUser`,
                        { headers: { 'auth-token': token } }
                    )
                    .then((res) => {
                        dispatch({
                            type: 'SET_USER',
                            payload: res.data,
                        });

                        closeModal('address');
                    })
            );
    };

    const changeInput = (e) => {
        setNewAddress(e.target.value);
    };

    return (
        <div className='modal'>
            <div className='modal__container add'>
                <span onClick={() => closeModal('address')} className='close'>
                    X
                </span>
                <div className='add__head'>
                    <h3>Change Avatar</h3>
                </div>
                <form className='add__body' onSubmit={submitForm}>
                    <div className='input'>
                        <label htmlFor='address'>Address:</label>
                        <input
                            type='text'
                            id='address'
                            value={newAddress}
                            onChange={changeInput}
                            name='address'
                            required
                        />
                    </div>

                    <button className='btn btn-accent'>Change Address</button>
                </form>
            </div>
        </div>
    );
};

export default ChangeAddress;
