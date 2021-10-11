import { FaWindowClose } from 'react-icons/fa';

import './Register.css';
import RegisterLogic from './RegisterLogic';

const Register = () => {
    const {
        registerClassNames,
        newUser,
        message,
        toggleRegisterModal,
        inputChange,
        submitBtnClick,
    } = RegisterLogic();

    return (
        <div className={registerClassNames}>
            <div
                className='register__overlay'
                onClick={toggleRegisterModal}
            ></div>
            <div className='register__container'>
                <button
                    className='register__close'
                    onClick={toggleRegisterModal}
                >
                    <FaWindowClose />
                </button>
                <div className='register__logo'>
                    T<span>W</span>
                </div>
                <p className='register__message'>{message}</p>
                <form className='register__form'>
                    <p>
                        <label htmlFor='registerUsername'>Username:</label>
                        <input
                            type='text'
                            id='registerUsername'
                            required
                            name='username'
                            onChange={inputChange}
                            value={newUser.username}
                        />
                    </p>
                    <p>
                        <label htmlFor='registerPassword'>Password:</label>
                        <input
                            type='password'
                            id='registerPassword'
                            required
                            name='password'
                            onChange={inputChange}
                            value={newUser.password}
                        />
                    </p>
                    <p>
                        <label htmlFor='registerConfirmPassword'>
                            Confirm Password:
                        </label>
                        <input
                            type='password'
                            id='registerConfirmPassword'
                            required
                            name='confirmPassword'
                            onChange={inputChange}
                            value={newUser.confirmPassword}
                        />
                    </p>
                    <p>
                        <input
                            type='submit'
                            value='Register'
                            className='register__submit'
                            onClick={submitBtnClick}
                        />
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
