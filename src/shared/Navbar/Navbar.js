// icons
import { FiSearch } from 'react-icons/fi';
import { IoCart } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';

import placeholder from 'assets/images/placeholder.png';

import UseComponentVisible from 'shared/UseComponentVisible';

const Navbar = () => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const searchWord = useSelector((state) => state.searchWord);
    const cart = useSelector((state) => state.cart);

    const history = useHistory();
    const dispatch = useDispatch();

    const openSublist = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    const routeToLoginPage = () => {
        history.push('/login');
    };

    const changeSearchWord = (e) => {
        dispatch({ type: 'SET_SEARCHWORD', payload: e.target.value });
    };

    const logout = () => {
        dispatch({ type: 'SET_TOKEN', payload: '' });
        dispatch({ type: 'SET_USER', payload: {} });
    };

    const { ref, isComponentVisible, setIsComponentVisible } =
        UseComponentVisible(false);

    return (
        <nav className='navbar'>
            <div className='navbar__container'>
                <Link to='/' className='navbar__logo'>
                    <h1 className='text-accent-dark'>Auxilium</h1>
                </Link>
                <div className='navbar__searchbar'>
                    <input
                        type='text'
                        placeholder='Search Item...'
                        value={searchWord}
                        onChange={changeSearchWord}
                    />
                    <FiSearch />
                </div>

                <div className='navbar__options'>
                    {token ? (
                        <>
                            <div className='user'>
                                {user.avatar ? (
                                    <img src={user.avatar} alt='avatar' />
                                ) : (
                                    <img src={placeholder} alt='avatar' />
                                )}

                                <p>{user.email?.split('@')[0]}</p>
                            </div>
                            {user.roles.includes('user') && (
                                <Link to='/cart'>
                                    <IoCart />{' '}
                                    <span>
                                        {cart
                                            .map((item) => item.count)
                                            .reduce((prev, current) => {
                                                return prev + current;
                                            }, 0)}
                                    </span>
                                </Link>
                            )}
                            <div ref={ref}>
                                <FaChevronDown onClick={openSublist} />
                                <ul className='sublist'>
                                    {isComponentVisible && (
                                        <>
                                            <Link to='/shop'>
                                                Change User Details
                                            </Link>
                                            <Link to='/shop' onClick={logout}>
                                                Logout
                                            </Link>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <button
                            className='btn btn-accent'
                            onClick={routeToLoginPage}
                        >
                            login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
