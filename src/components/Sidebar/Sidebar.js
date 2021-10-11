import { Link } from 'react-router-dom';
import placeholder from '../../assets/images/profile.jpg';
import { FaHome } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { ImExit } from 'react-icons/im';

import './Sidebar.css';
import SidebarLogic from './SidebarLogic';

const Sidebar = () => {
    const {
        sidebarClassNames,
        overlayClassNames,
        toggleLoginModal,
        toggleRegisterModal,
        token,
        currentUser,
        logout,
        closeSidebar,
    } = SidebarLogic();

    return (
        <>
            <div className={overlayClassNames} onClick={closeSidebar}></div>
            <nav className={sidebarClassNames} onClick={closeSidebar}>
                <div className='profile'>
                    {!token ? (
                        <div className='sidebar__buttons'>
                            <button
                                className='sidebar__login'
                                onClick={toggleLoginModal}
                            >
                                Login
                            </button>
                            <button
                                className='sidebar__register'
                                onClick={toggleRegisterModal}
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <>
                            <img
                                src={placeholder}
                                alt='profile avatar'
                                className='profile_image'
                            />
                            <h4>{currentUser.username}</h4>
                        </>
                    )}
                </div>
                <ul className='sidebar__list'>
                    <li className='sidebar__item'>
                        <Link to='/'>
                            <FaHome /> <span>Home</span>
                        </Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/about-us'>
                            <HiUserGroup /> <span>About Us</span>
                        </Link>
                    </li>
                    {token && (
                        <li className='sidebar__item'>
                            <Link to='#' onClick={logout}>
                                <ImExit /> <span>Logout</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
