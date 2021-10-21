import { useSelector } from 'react-redux';
import Item from './Item';

const Items = () => {
    const items = useSelector((state) => state.items);
    return (
        <div>
            {items.map((item) => (
                <Item item={item} key={item._id} />
            ))}
        </div>
    );
};

export default Items;