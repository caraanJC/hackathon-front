import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ChangePassword = ({ closeModal }) => {
    const token = useSelector((state) => state.token);

    const [passwordToSet, setPasswordToSet] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const submitForm = (e) => {
        e.preventDefault();

        if (passwordToSet.newPassword !== passwordToSet.confirmPassword) {
            alert("New Password and Confirm Password don't match");
        } else {
            axios
                .put(
                    'http://localhost:8000/api/users/changePassword',
                    {
                        oldPassword: passwordToSet.oldPassword,
                        password: passwordToSet.newPassword,
                    },
                    { headers: { 'auth-token': token } }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert(res.data.message);
                        closeModal('password');
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    };

    const changeInput = (e) => {
        setPasswordToSet({
            ...passwordToSet,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='modal'>
            <div className='modal__container add'>
                <span onClick={() => closeModal('password')} className='close'>
                    X
                </span>
                <div className='add__head'>
                    <h3>Change Password</h3>
                </div>
                <form className='add__body' onSubmit={submitForm}>
                    <div className='input'>
                        <label htmlFor='oldPassword'>Old Password:</label>
                        <input
                            type='password'
                            id='oldPassword'
                            value={passwordToSet.oldPassword}
                            onChange={changeInput}
                            name='oldPassword'
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='newPassword'>New Password:</label>
                        <input
                            type='password'
                            id='newPassword'
                            value={passwordToSet.newPassword}
                            onChange={changeInput}
                            name='newPassword'
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='confirmPassword'>
                            Confirm Password:
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            value={passwordToSet.confirmPassword}
                            onChange={changeInput}
                            name='confirmPassword'
                            required
                        />
                    </div>
                    <button className='btn btn-accent'>Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
