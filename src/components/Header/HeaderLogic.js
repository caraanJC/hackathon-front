import { useDispatch } from 'react-redux';

const HeaderLogic = () => {
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
    };

    return { toggleSidebar };
};

export default HeaderLogic;
