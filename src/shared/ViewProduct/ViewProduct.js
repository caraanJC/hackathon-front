const ViewProduct = () => {
  return (
    <div className="modal">
      <form className="modal__container view">
        <span>X</span>
        <div className="view__head">
          <div className="img">
            <img src="" alt="" />
          </div>
          <div className="desc">
            <h3>NAME</h3>
            <h4>Php 300</h4>
            <button className="btn btn-accent">Add To Cart</button>
          </div>
        </div>
        <div className="view__body">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            repellendus assumenda ex ab, aliquid ullam qui fugiat tenetur
            laudantium, dolor nemo? Dolor, sequi non vel suscipit enim
            voluptatem, sed, odio iusto explicabo reiciendis ipsam ipsum!
            Mollitia alias dolorum voluptatum animi.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ViewProduct;
