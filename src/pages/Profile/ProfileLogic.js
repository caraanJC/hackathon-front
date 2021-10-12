import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storage } from '../../base';

const ProfileLogic = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const token = useSelector((state) => state.token);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [file, setFile] = useState('');

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

    return {
        currentUser,
        showUploadModal,
        token,
        openUpload,
        closeUpload,
        file,
        changeFile,
        uploadFile,
    };
};

export default ProfileLogic;
