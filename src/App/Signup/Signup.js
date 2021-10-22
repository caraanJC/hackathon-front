import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [signupCredentials, setSignupCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const history = useHistory();

    const inputChange = (e) => {
        setSignupCredentials({
            ...signupCredentials,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (signupCredentials.password.length < 4) {
            alert('Password must be atleast 4 characters long');
        } else if (
            signupCredentials.password !== signupCredentials.confirmPassword
        ) {
            alert("Passwords don't match");
        } else {
            axios.post('http://localhost:8000/api/auth/register', {
                email: signupCredentials.email,
                password: signupCredentials.password,
            });

            alert('Registration Successful');

            setSignupCredentials({
                email: '',
                password: '',
                confirmPassword: '',
            });

            history.push('/login');
        }
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__head'>
                    <h4>Sign up for free</h4>
                    <p>Login or create a new account</p>
                </div>
                <form className='login__body' onSubmit={submitForm}>
                    <div className='input'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={signupCredentials.email}
                            onChange={inputChange}
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={signupCredentials.password}
                            onChange={inputChange}
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='confirm-password'>
                            Confirm Password:
                        </label>
                        <input
                            type='password'
                            id='confim-password'
                            name='confirmPassword'
                            value={signupCredentials.confirmPassword}
                            onChange={inputChange}
                            required
                        />
                    </div>
                    <button className='btn btn-accent'>
                        Create new Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
