const initialState = {
    showSidebar: false,
    showLoginModal: false,
    showRegisterModal: false,
    currentUser: {},
    token: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return { ...state, showSidebar: !state.showSidebar };

        case 'OPEN_SIDEBAR':
            return { ...state, showSidebar: true };

        case 'CLOSE_SIDEBAR':
            return { ...state, showSidebar: false };

        case 'TOGGLE_LOGIN_MODAL':
            return { ...state, showLoginModal: !state.showLoginModal };

        case 'TOGGLE_REGISTER_MODAL':
            return { ...state, showRegisterModal: !state.showRegisterModal };

        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };

        case 'SET_TOKEN':
            return { ...state, token: action.payload };

        default:
            return state;
    }
};

export default reducer;
