// icons
import { FiSearch } from 'react-icons/fi';
import { IoCart } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';
import { AiFillShop } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { ImHome } from 'react-icons/im';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';

import placeholder from '../../assets/images/placeholder.png';

import UseComponentVisible from '../../shared/UseComponentVisible';
import { useState } from 'react';
import ChangeUserDetail from './ChangeUserDetail/ChangeUserDetail';

const Navbar = () => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const searchWord = useSelector((state) => state.searchWord);
    const cart = useSelector((state) => state.cart);

    const history = useHistory();
    const dispatch = useDispatch();

    const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

    const openSublist = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    const openUserSettings = () => {
        setIsUserSettingsOpen(true);
    };

    const closeUserSettings = () => {
        setIsUserSettingsOpen(false);
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
        dispatch({ type: 'SET_CART', payload: [] });
        dispatch({ type: 'SET_SEARCHWORD', payload: '' });
    };

    const openAddProduct = () => {
        dispatch({ type: 'SET_IS_ADD_PRODUCT_OPEN', payload: true });
    };

    const { ref, isComponentVisible, setIsComponentVisible } =
        UseComponentVisible(false);

    return (
        <>
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
                        {user.roles?.includes('admin') && (
                            <button
                                className='btn btn-accent'
                                onClick={openAddProduct}
                            >
                                Add Product
                            </button>
                        )}
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
                                <Link to='/'>
                                    <ImHome />
                                </Link>
                                <Link to='/shop'>
                                    <AiFillShop />
                                </Link>
                                {user.roles.includes('admin') && (
                                    <Link to='/sales'>
                                        <BsCurrencyDollar />
                                    </Link>
                                )}
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
                                                <Link
                                                    to='#'
                                                    onClick={openUserSettings}
                                                >
                                                    Change User Details
                                                </Link>
                                                <Link
                                                    to='/shop'
                                                    onClick={logout}
                                                >
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
            {isUserSettingsOpen && (
                <ChangeUserDetail closeUserSettings={closeUserSettings} />
            )}
        </>
    );
};

export default Navbar;
