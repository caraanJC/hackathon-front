import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChangeAddress from './ChangeAddress';
import ChangeAvatar from './ChangeAvatar';
import ChangePassword from './ChangePassword';

import './ChangeUserDetail.css';

const ChangeUserDetail = ({ closeUserSettings }) => {
    const user = useSelector((state) => state.user);

    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);
    const [isChangeAddressOpen, setIsChangeAddressOpen] = useState(false);

    const buttonClick = (e) => {
        if (e.target.name === 'password') {
            setIsChangePasswordOpen(true);
        } else if (e.target.name === 'avatar') {
            setIsChangeAvatarOpen(true);
        } else if (e.target.name === 'address') {
            setIsChangeAddressOpen(true);
        }
    };

    const closeModal = (modalName) => {
        if (modalName === 'password') {
            setIsChangePasswordOpen(false);
        } else if (modalName === 'avatar') {
            setIsChangeAvatarOpen(false);
        } else if (modalName === 'address') {
            setIsChangeAddressOpen(false);
        }
    };

    return (
        <>
            <div className='modal'>
                <div className='modal__container add'>
                    <span onClick={closeUserSettings} className='close'>
                        X
                    </span>
                    <div className='add__head'>
                        <h3>User Settings</h3>
                        <img
                            src={user.avatar}
                            alt='user avatar'
                            className='user__avatar'
                        />
                        <p>{user.email}</p>
                    </div>
                    <div className='change-button-group'>
                        <button
                            className='btn'
                            name='password'
                            onClick={buttonClick}
                        >
                            Change Password
                        </button>
                        <button
                            className='btn'
                            name='avatar'
                            onClick={buttonClick}
                        >
                            Change Avatar
                        </button>
                        <button
                            className='btn'
                            name='address'
                            onClick={buttonClick}
                        >
                            Change Address
                        </button>
                    </div>
                </div>
            </div>
            {isChangePasswordOpen && <ChangePassword closeModal={closeModal} />}
            {isChangeAvatarOpen && <ChangeAvatar closeModal={closeModal} />}
            {isChangeAddressOpen && <ChangeAddress closeModal={closeModal} />}
        </>
    );
};

export default ChangeUserDetail;
