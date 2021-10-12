import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storage } from '../../base';

const ProfileLogic = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const token = useSelector((state) => state.token);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [userPassword, setUserPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const openUpload = () => {
        setShowUploadModal(true);
    };

    const closeUpload = () => {
        setShowUploadModal(false);
    };

    const changeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        if (!file) return;
        const avatarRef = ref(
            storage,
            `${currentUser.username}/images/avatar.jpg`
        );

        setShowUploadModal(false);

        await uploadBytes(avatarRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        await getDownloadURL(avatarRef)
            .then((url) => {
                axios.put(
                    'http://localhost:8000/api/users/changeAvatar',
                    { url },
                    {
                        headers: { 'auth-token': token },
                    }
                );
            })
            .catch((error) => {
                console.log(error);
            });
        await axios
            .get(`http://localhost:8000/api/users/${currentUser._id}/getUser`, {
                headers: { 'auth-token': token },
            })
            .then((res) => {
                dispatch({
                    type: 'SET_CURRENT_USER',
                    payload: res.data,
                });
            });
        setFile('');
    };

    const openChangePassword = () => {
        setShowPasswordModal(true);
    };

    const closeChangePassword = () => {
        setShowPasswordModal(false);
    };

    const inputChange = (e) => {
        setMessage('');
        setUserPassword({
            ...userPassword,
            [e.target.name]: e.target.value,
        });
    };

    const changePassword = (e) => {
        e.preventDefault();

        if (!userPassword.oldPassword) {
            setMessage('Old Password cannot be empty');
        } else if (!userPassword.newPassword) {
            setMessage('New Password cannot be empty');
        } else if (!userPassword.confirmPassword) {
            setMessage('Confirm Password cannot be empty');
        } else if (userPassword.newPassword !== userPassword.confirmPassword) {
            setMessage('Passwords must match');
        } else {
            // check password
            axios
                .post(
                    'http://localhost:8000/api/users/checkPassword',
                    { password: userPassword.oldPassword },
                    { headers: { 'auth-token': token } }
                )
                .then((res) => {
                    if (res.data) {
                        // proceed to change
                        axios.put(
                            'http://localhost:8000/api/users/changePassword',
                            { password: userPassword.newPassword },
                            { headers: { 'auth-token': token } }
                        );
                        setShowPasswordModal(false);
                        setUserPassword({
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        });
                    } else {
                        setMessage('Old Password incorrect');
                    }
                });
        }
    };

    return {
        currentUser,
        showUploadModal,
        showPasswordModal,
        token,
        openUpload,
        closeUpload,
        openChangePassword,
        closeChangePassword,
        file,
        changeFile,
        uploadFile,
        userPassword,
        inputChange,
        changePassword,
        message,
    };
};

export default ProfileLogic;
