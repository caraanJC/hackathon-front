const initialState = {
    items: [],
    token: '',
    user: {},
    cart: [],
    searchWord: '',
    isAddProductOpen: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_SEARCHWORD':
            return { ...state, searchWord: action.payload };
        case 'SET_CART':
            return { ...state, cart: action.payload };
        case 'SET_IS_ADD_PRODUCT_OPEN':
            return { ...state, isAddProductOpen: action.payload };
        default:
            return state;
    }
};

export default reducer;
