import { useDispatch, useSelector } from 'react-redux';

const SidebarLogic = () => {
    const showSidebar = useSelector((state) => state.showSidebar);
    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.currentUser);

    const sidebarClassNames = `sidebar ${showSidebar ? 'active' : ''}`;
    const overlayClassNames = `sidebar__overlay ${showSidebar ? 'active' : ''}`;

    const dispatch = useDispatch();

    const toggleLoginModal = () => {
        dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
    };

    const toggleRegisterModal = () => {
        dispatch({ type: 'TOGGLE_REGISTER_MODAL' });
    };

    const logout = () => {
        dispatch({ type: 'SET_TOKEN', payload: '' });
        dispatch({ type: 'SET_CURRENT_USER', payload: {} });
    };

    const closeSidebar = () => {
        dispatch({ type: 'CLOSE_SIDEBAR' });
    };

    return {
        sidebarClassNames,
        overlayClassNames,
        toggleLoginModal,
        toggleRegisterModal,
        token,
        currentUser,
        logout,
        closeSidebar,
    };
};

export default SidebarLogic;
