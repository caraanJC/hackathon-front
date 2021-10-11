import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClickOutside } from '../../helper';

const NavbarLogic = () => {
    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.currentUser);

    const [showSublist, setShowSublist] = useState(false);

    const dispatch = useDispatch();

    const toggleLoginModal = () => {
        dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
    };

    const avatarClick = () => {
        setShowSublist(true);
    };

    const logout = () => {
        dispatch({ type: 'SET_TOKEN', payload: '' });
        dispatch({ type: 'SET_CURRENT_USER', payload: {} });
        setShowSublist(false);
    };

    const sublistClassNames = `navbar__sublist ${showSublist ? 'active' : ''}`;

    let sublist = useClickOutside(() => {
        setShowSublist(false);
    });

    return {
        token,
        toggleLoginModal,
        avatarClick,
        sublistClassNames,
        sublist,
        logout,
        currentUser,
    };
};

export default NavbarLogic;
