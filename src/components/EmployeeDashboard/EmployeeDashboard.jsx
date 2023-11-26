import { useMemo, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { getAllProducts, sellProducts } from "../../api/productService";
import { getUserData } from "../../utils/localStorage";
import "./styles.css";

const EmployeeDashboard = () => {
  const { data: allProducts = [] } = useFetchData(getAllProducts);

  const [rightProducts, setRightProducts] = useState([]);

  const totalPrice = useMemo(
    () =>
      rightProducts.reduce((acc, { productPrice }) => productPrice + acc, 0),
    [rightProducts]
  );

  const handleDragStart = (e, product) => {
    e.dataTransfer.setData("product", JSON.stringify(product));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const product = JSON.parse(e.dataTransfer.getData("product"));
    setRightProducts([...rightProducts, product]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSellProducts = async () => {
    if (!rightProducts.length) {
      alert("Nothing to sell!");
      return;
    }

    const soldProductData = {
      username: getUserData().username,
      totalPrice,
      products: rightProducts,
      date: new Date(),
    };

    const response = await sellProducts(soldProductData);
    if (response.status === 201) {
      alert("Successfully Sold!");
      setRightProducts([]);
    }
  };

  return (
    <div className="employee-dashboard">
      <div className="left-list">
        <h3>Available Products</h3>
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="product-item"
            draggable
            onDragStart={(e) => handleDragStart(e, product)}
          >
            <span>{product.productName}</span>
            <span>${product.productPrice}</span>
          </div>
        ))}
      </div>
      <div
        className="right-list bottom-addon"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div>
          <h3>Selected Products</h3>
          {rightProducts.map((product) => (
            <div key={product.id} className="product-item">
              <span>{product.productName}</span>
              <span>${product.productPrice}</span>
            </div>
          ))}
        </div>
        <div className="total-bar bottom-item">
          <div className="total-bar-pricing">
            <span className="total">Total</span>
            <span className="total">${totalPrice}</span>
          </div>
          <button className="button" onClick={handleSellProducts}>
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
