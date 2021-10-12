import { Link, NavLink } from 'react-router-dom';
import { RiLogoutBoxLine } from 'react-icons/ri';

import './Navbar.css';
import NavbarLogic from './NavbarLogic';

import placeholder from '../../assets/images/profile.jpg';

const Navbar = () => {
    const {
        token,
        sublistClassNames,
        sublist,
        currentUser,
        toggleLoginModal,
        avatarClick,
        logout,
    } = NavbarLogic();
    return (
        <nav className='navbar'>
            <ul className='navbar__list'>
                <li className='navbar__item'>
                    <NavLink
                        exact
                        to='/'
                        activeClassName='activeLink'
                        className='navbar__link'
                    >
                        Home
                    </NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink
                        exact
                        to='/about-us'
                        activeClassName='activeLink'
                        className='navbar__link'
                    >
                        About Us
                    </NavLink>
                </li>
                <li className='navbar__item'>
                    <div className='navbar__profile'>
                        {!token ? (
                            <button onClick={toggleLoginModal}>Login</button>
                        ) : (
                            <>
                                {currentUser.avatar ? (
                                    <img
                                        src={currentUser.avatar}
                                        alt='user avatar'
                                        className='profile_image'
                                        onClick={avatarClick}
                                    />
                                ) : (
                                    <img
                                        src={placeholder}
                                        alt='user avatar'
                                        className='profile_image'
                                        onClick={avatarClick}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </li>
            </ul>
            <ul className={sublistClassNames} ref={sublist}>
                <li className='sublist__profile'>
                    <Link to='/profile'>
                        {currentUser.avatar ? (
                            <img src={currentUser.avatar} alt='user avatar' />
                        ) : (
                            <img src={placeholder} alt='user avatar' />
                        )}
                        <p className='user__details'>
                            <span>{currentUser.username}</span>{' '}
                            <small>View Profile</small>
                        </p>
                    </Link>
                </li>

                <li>
                    <Link to='/' onClick={logout} className='navbar__logout'>
                        <RiLogoutBoxLine /> <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
