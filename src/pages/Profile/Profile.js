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
                                <div className='avatar__upload'>
                                    <button
                                        onClick={closeUpload}
                                        className='upload__close'
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
                    </>
                ) : (
                    <h1>Please Login</h1>
                )}
            </div>
        </div>
    );
};

export default Profile;
