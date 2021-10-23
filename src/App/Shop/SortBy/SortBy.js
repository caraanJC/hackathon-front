import { useDispatch } from 'react-redux';

const SortBy = () => {
    const dispatch = useDispatch();

    const selectChange = (e) => {
        switch (e.target.value) {
            case 'priceAscending':
                dispatch({
                    type: 'SET_SORTER',
                    payload: (a, b) =>
                        parseFloat(a.price) - parseFloat(b.price),
                });
                break;
            case 'priceDescending':
                dispatch({
                    type: 'SET_SORTER',
                    payload: (a, b) =>
                        parseFloat(b.price) - parseFloat(a.price),
                });
                break;
            case 'alphabetical':
                dispatch({
                    type: 'SET_SORTER',
                    payload: (a, b) => {
                        if (a.firstname < b.firstname) {
                            return -1;
                        }
                        if (a.firstname > b.firstname) {
                            return 1;
                        }
                        return 0;
                    },
                });
                break;
            default:
                dispatch({
                    type: 'SET_SORTER',
                    payload: (a, b) =>
                        parseFloat(a.price) - parseFloat(b.price),
                });
        }
    };
    return (
        <div className='sortBy'>
            <label htmlFor='sorter'>Sort by</label>
            <select onChange={selectChange} id='sorter'>
                <option value='priceAscending'>Price Ascending</option>
                <option value='priceDescending'>Price Descending</option>
                <option value='alphabetical'>Alphabetical</option>
            </select>
        </div>
    );
};

export default SortBy;
