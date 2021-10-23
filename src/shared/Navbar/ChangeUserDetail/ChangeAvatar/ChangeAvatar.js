import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storage } from '../../../../base';

const ChangeAvatar = ({ closeModal }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [file, setFile] = useState();

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();

        const userAvatarRef = ref(
            storage,
            `users/avatar/${user.email.split('@')[0]}/${file.name}`
        );

        uploadBytes(userAvatarRef, file).then((snapshot) => {
            getDownloadURL(userAvatarRef).then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                axios
                    .put(
                        'http://localhost:8000/api/users/changeAvatar',
                        {
                            url,
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
                                    type: 'SET_USER',
                                    payload: res.data,
                                });
                                setFile('');
                                closeModal('avatar');
                            });
                    });
            });
        });
    };

    const changeInput = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className='modal'>
            <div className='modal__container add'>
                <span onClick={() => closeModal('avatar')} className='close'>
                    X
                </span>
                <div className='add__head'>
                    <h3>Change Avatar</h3>
                </div>
                <form className='add__body' onSubmit={submitForm}>
                    <div className='input'>
                        <label htmlFor='avatar'>Avatar:</label>
                        <input
                            type='file'
                            id='avatar'
                            onChange={changeInput}
                            name='avatar'
                            required
                        />
                    </div>

                    <button className='btn btn-accent'>Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangeAvatar;
