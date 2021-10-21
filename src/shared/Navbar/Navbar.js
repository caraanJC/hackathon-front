// icons
import { FiSearch } from 'react-icons/fi';
import { IoCart } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UseComponentVisible from 'shared/UseComponentVisible';

const Navbar = () => {
    const token = useSelector((state) => state.token);

    const openSublist = () => {
        setIsComponentVisible(true);
    };

    const { ref, isComponentVisible, setIsComponentVisible } =
        UseComponentVisible(false);

    return (
        <nav>
            <div>
                <Link to='/shop'>Auxilium</Link>
            </div>
            <div>
                <input type='text' />
                <FiSearch />
            </div>
            <div>
                {token ? (
                    <div>
                        <div>
                            <img src='' alt='Avatar' />
                        </div>
                        <p>Username</p>
                    </div>
                ) : (
                    <button>login</button>
                )}
                <Link to='/cart'>
                    <IoCart />
                </Link>
                <button onClick={openSublist}>
                    <FaChevronDown />
                </button>
            </div>
            <div ref={ref}>
                {isComponentVisible && (
                    <ul>
                        <li>
                            <Link to='/shop'>Change User Details</Link>
                        </li>
                        <li>
                            <Link to='/shop'>Logout</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
