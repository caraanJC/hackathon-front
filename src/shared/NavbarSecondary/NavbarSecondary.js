import { Link } from 'react-router-dom';

const NavbarSecondary = () => {
    return (
        <nav className='navbarSecondary'>
            <Link to='/' className='navbar__logo'>
                <h1 className='text-accent-dark'>Auxilium</h1>
            </Link>

            <ul>
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/about'>About</Link>
            </ul>
        </nav>
    );
};

export default NavbarSecondary;
