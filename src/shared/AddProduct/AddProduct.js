const AddProduct = () => {
  return (
    <div className="modal">
      <div className="modal__container add">
        <span>X</span>
        <div className="add__head">
          <h3>Add Item</h3>
        </div>
        <form className="add__body">
          <div className="input">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
          </div>
          <div className="input">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" />
          </div>
          <div className="input">
            <label htmlFor="desc">Description:</label>
            <textarea id="desc"></textarea>
          </div>
          <div className="input">
            <label htmlFor="file">Image:</label>
            <input type="file" id="file" accept="image/png, image/jpeg" />
          </div>
          <button className="btn btn-accent">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
