import { FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Login.css';
import LoginLogic from './LoginLogic';

const Login = () => {
    const {
        loginClassNames,
        loginCred,
        message,
        toggleLoginModal,
        suggestionClick,
        submitForm,
        inputChange,
    } = LoginLogic();

    return (
        <div className={loginClassNames}>
            <div className='login__overlay' onClick={toggleLoginModal}></div>
            <div className='login__container'>
                <button className='login__close' onClick={toggleLoginModal}>
                    <FaWindowClose />
                </button>
                <div className='login__logo'>
                    T<span>W</span>
                </div>
                <p className='login__message'>{message}</p>
                <form className='login__form' onSubmit={submitForm}>
                    <p>
                        <label htmlFor='loginUsername'>Username:</label>
                        <input
                            type='text'
                            id='loginUsername'
                            required
                            value={loginCred.username}
                            onChange={inputChange}
                            name='username'
                        />
                    </p>
                    <p>
                        <label htmlFor='loginPassword'>Password:</label>
                        <input
                            type='password'
                            id='loginPassword'
                            required
                            value={loginCred.password}
                            onChange={inputChange}
                            name='password'
                        />
                    </p>
                    <p>
                        <input
                            type='submit'
                            value='Login'
                            className='login__submit'
                        />
                    </p>
                </form>
                <div className='login__suggestion'>
                    <p>
                        Don't have an account?{' '}
                        <Link to='#' onClick={suggestionClick}>
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
