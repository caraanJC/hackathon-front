import ProfileLogic from './ProfileLogic';

import placeholder from '../../assets/images/profile.jpg';

import { FaWindowClose } from 'react-icons/fa';

import './Profile.css';

const Profile = () => {
    const {
        currentUser,
        showUploadModal,
        token,
        openUpload,
        closeUpload,
        changeFile,
        uploadFile,
        openChangePassword,
        closeChangePassword,
        showPasswordModal,
        userPassword,
        inputChange,
        message,
        changePassword,
    } = ProfileLogic();
    return (
        <div className='profile'>
            <div className='profile__container'>
                {token ? (
                    <>
                        <h1>Profile</h1>
                        <div className='profile__section'>
                            <h2>Avatar</h2>
                            {currentUser.avatar ? (
                                <img
                                    src={currentUser.avatar}
                                    alt='user avatar'
                                    className='profile__avatar'
                                />
                            ) : (
                                <img
                                    src={placeholder}
                                    alt='user avatar'
                                    className='profile__avatar'
                                />
                            )}
                            <button
                                className='profile__button'
                                onClick={openUpload}
                            >
                                Change Avatar
                            </button>
                            {showUploadModal && (
                                <div className='inner__card'>
                                    <button
                                        onClick={closeUpload}
                                        className='inner__close'
                                    >
                                        <FaWindowClose />
                                    </button>
                                    <h3>Change Avatar</h3>
                                    <form onSubmit={uploadFile}>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            onChange={changeFile}
                                        />
                                        <input
                                            type='submit'
                                            value='Upload'
                                            className='profile__button'
                                        />
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className='profile__section'>
                            <h2>Password</h2>
                            <button
                                className='profile__button'
                                onClick={openChangePassword}
                            >
                                Change Password
                            </button>
                            {showPasswordModal && (
                                <div className='inner__card'>
                                    <button
                                        onClick={closeChangePassword}
                                        className='inner__close'
                                    >
                                        <FaWindowClose />
                                    </button>
                                    <h3>Change Avatar</h3>
                                    <p className='inner__message'>{message}</p>
                                    <form onSubmit={changePassword}>
                                        <p>
                                            <label htmlFor='oldPassword'>
                                                Old Password:
                                            </label>
                                            <input
                                                type='password'
                                                id='oldPassword'
                                                value={userPassword.oldPassword}
                                                name='oldPassword'
                                                onChange={inputChange}
                                            />
                                        </p>
                                        <p>
                                            <label htmlFor='newPassword'>
                                                New Password:
                                            </label>
                                            <input
                                                type='password'
                                                id='newPassword'
                                                value={userPassword.newPassword}
                                                name='newPassword'
                                                onChange={inputChange}
                                            />
                                        </p>
                                        <p>
                                            <label htmlFor='confirmNewPassword'>
                                                Confirm Password:
                                            </label>
                                            <input
                                                type='password'
                                                id='confirmNewPassword'
                                                value={
                                                    userPassword.confirmPassword
                                                }
                                                name='confirmPassword'
                                                onChange={inputChange}
                                            />
                                        </p>
                                        <input
                                            type='submit'
                                            value='Save'
                                            className='profile__button'
                                        />
                                    </form>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <h1>Please Login</h1>
                )}
            </div>
        </div>
    );
};

export default Profile;
