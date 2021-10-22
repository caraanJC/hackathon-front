import { useSelector } from 'react-redux';
import Item from './Item';

const Items = () => {
    const items = useSelector((state) => state.items);
    const searchWord = useSelector((state) => state.searchWord);

    return (
        <div className='shop__container'>
            {items
                .filter(
                    (item) => item.name.includes(searchWord) && item.stock > 0
                )
                .map((item) => (
                    <Item item={item} key={item._id} />
                ))}
        </div>
    );
};

export default Items;
