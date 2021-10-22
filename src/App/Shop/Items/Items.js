import { useSelector } from 'react-redux';
import Item from './Item';

const Items = () => {
<<<<<<< HEAD
    const items = useSelector((state) => state.items);
    const searchWord = useSelector((state) => state.searchWord);

    return (
        <div>
            {items
                .filter((item) => item.name.includes(searchWord))
                .map((item) => (
                    <Item item={item} key={item._id} />
                ))}
        </div>
    );
=======
  const items = useSelector((state) => state.items);
  return (
    <div className="shop__container">
      {items.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </div>
  );
>>>>>>> 4c574fda2c73689f3c0218f331ff5811b53c9476
};

export default Items;
