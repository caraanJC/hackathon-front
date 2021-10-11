import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

const LoginLogic = () => {
    const showLoginModal = useSelector((state) => state.showLoginModal);

    const loginClassNames = `login ${showLoginModal ? 'active' : ''}`;

    const dispatch = useDispatch();

    const [loginCred, setLoginCred] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const toggleLoginModal = () => {
        dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
    };

    const suggestionClick = () => {
        dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
        dispatch({ type: 'TOGGLE_REGISTER_MODAL' });
    };

    const inputChange = (e) => {
        setLoginCred({
            ...loginCred,
            [e.target.name]: e.target.value,
        });
        setMessage('');
    };

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/auth/login', {
                username: loginCred.username,
                password: loginCred.password,
            })
            .then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: 'SET_CURRENT_USER',
                        payload: res.data.user,
                    });
                    dispatch({ type: 'SET_TOKEN', payload: res.data.token });

                    setLoginCred({
                        username: '',
                        password: '',
                    });

                    toggleLoginModal();
                } else {
                    setMessage(res.data.message);
                }
            });
    };

    return {
        toggleLoginModal,
        loginClassNames,
        loginCred,
        message,
        suggestionClick,
        submitForm,
        inputChange,
    };
};

export default LoginLogic;
