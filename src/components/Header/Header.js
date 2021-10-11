import { FaBars } from 'react-icons/fa';

import './Header.css';
import HeaderLogic from './HeaderLogic';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    const { toggleSidebar } = HeaderLogic();
    return (
        <>
            <header className='header'>
                <div className='left_area'>
                    <Link to='/'>
                        <h3>
                            The <span>Work</span>
                        </h3>
                    </Link>
                </div>
                <div className='right_area'>
                    <button className='burger' onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <Navbar />
                </div>
            </header>
        </>
    );
};

export default Header;
