const initialState = {
    items: [],
    token: '',
    user: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default reducer;
