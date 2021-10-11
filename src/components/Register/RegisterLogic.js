import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const LoginLogic = () => {
    const showRegisterModal = useSelector((state) => state.showRegisterModal);

    const registerClassNames = `login ${showRegisterModal ? 'active' : ''}`;

    const dispatch = useDispatch();

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');

    const toggleRegisterModal = () => {
        dispatch({ type: 'TOGGLE_REGISTER_MODAL' });
    };

    const inputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
        setMessage('');
    };

    const formSubmit = (targetBtn) => {
        if (!newUser.username) {
            setMessage('Username cannot be empty');
            targetBtn.disabled = false;
        } else if (newUser.username.length < 5) {
            setMessage('Username length should at least be 5 characters long');
            targetBtn.disabled = false;
        } else if (!newUser.password) {
            setMessage('Password cannot be empty');
            targetBtn.disabled = false;
        } else if (newUser.password.length < 5) {
            setMessage('Password length should at least be 5 characters long');
            targetBtn.disabled = false;
        } else if (!newUser.confirmPassword) {
            setMessage('Confirm Password cannot be empty');
            targetBtn.disabled = false;
        } else if (newUser.password !== newUser.confirmPassword) {
            setMessage('Passwords must match');
            targetBtn.disabled = false;
        } else {
            axios
                .post('http://localhost:8000/api/auth/register', {
                    username: newUser.username,
                    password: newUser.password,
                })
                .then((res) => {
                    if (res.data.success === false) {
                        setMessage(res.data.message);
                        targetBtn.disabled = false;
                    } else {
                        targetBtn.disabled = false;
                        setNewUser({
                            username: '',
                            password: '',
                            confirmPassword: '',
                        });
                        toggleRegisterModal();
                    }
                });
        }
    };

    const submitBtnClick = async (e) => {
        e.preventDefault();

        e.target.disabled = true;
        formSubmit(e.target);
    };

    return {
        registerClassNames,
        message,
        newUser,
        toggleRegisterModal,
        inputChange,
        submitBtnClick,
    };
};

export default LoginLogic;
