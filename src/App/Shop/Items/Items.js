import { useSelector } from 'react-redux';
import Item from './Item';

const Items = () => {
    const items = useSelector((state) => state.items);
    const searchWord = useSelector((state) => state.searchWord);
    const user = useSelector((state) => state.user);

    return (
        <div className='shop__container'>
            {items
                .filter(
                    (item) =>
                        (item.name
                            ?.toLowerCase()
                            ?.includes(searchWord.toLowerCase()) &&
                            item.stock > 0) ||
                        user.roles?.includes('admin')
                )
                .map((item) => (
                    <Item item={item} key={item._id} />
                ))}
        </div>
    );
};

export default Items;
