const Item = ({ item }) => {
    return (
        <div>
            <div>
                <img src={item.image} alt='Item' />
            </div>
            <div>
                <div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                </div>
                <div>
                    <button>Add To Cart</button>
                    <button>View</button>
                </div>
            </div>
        </div>
    );
};

export default Item;
