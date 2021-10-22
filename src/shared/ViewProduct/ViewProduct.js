const ViewProduct = ({ item, setIsViewProductOpen }) => {
  const closeViewProduct = () => {
    setIsViewProductOpen(false);
  };

  return (
    <div className="modal">
      <form className="modal__container view">
        <span onClick={closeViewProduct} className="close">
          X
        </span>
        <div className="view__head">
          <div className="img">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="desc">
            <h3>{item.name}</h3>
            <h4>Php {item.price}</h4>
            <button className="btn btn-accent">Add To Cart</button>
          </div>
        </div>
        <div className="view__body">
          <p>{item.description}</p>
        </div>
      </form>
    </div>
  );
};

export default ViewProduct;
