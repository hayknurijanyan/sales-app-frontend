import { useState } from "react";
import {
  addProduct,
  getAllProducts,
  getSoldProducts,
} from "./../../api/productService";
import useFetchData from "../../hooks/useFetchData";
import { getUserData } from "../../utils/localStorage";
import "./styles.css";

const AdminDashboard = () => {
  const [product, setProduct] = useState({ productName: "", productPrice: "" });
  const { data: soldProducts = [] } = useFetchData(getSoldProducts);

  const { data: allProducts = [], refetch } = useFetchData(getAllProducts);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    if (isNaN(product.productPrice)) {
      alert("Product price must be a number");
      return;
    }
    const response = await addProduct({ user: getUserData(), product });

    if (response.status === 201) {
      refetch();
      setProduct({
        productName: "",
        productPrice: "",
      });
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Buyers history</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {soldProducts.map((data, index) => (
            <tr key={data._id}>
              {/* TODO CHANGE TO REAL AUTO INCREMENT ID (index used for cleaner view) */}
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.products.join(", ")}</td>
              <td>${data.totalPrice}</td>
              <td>{new Date(data.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((data, index) => (
            <tr key={data._id}>
              {/* Should be changed to IDs */}
              <td>{index + 1}</td>
              <td>{data.productName}</td>
              <td>${data.productPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="product-details-title">Add Product</h3>
      <div className="product-details">
        <form>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="productPrice"
            value={product.productPrice}
            onChange={handleInputChange}
            placeholder="Product Price"
          />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
