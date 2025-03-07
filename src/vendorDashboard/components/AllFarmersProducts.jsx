import React, { useEffect, useState } from 'react';

import { API_URL } from '../data/apiPath';

const AllFarmersProducts = ({onSelectProduct}) => {
  //Props passed as New change
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/product/all-products`);
      const data = await response.json();
      console.log("API Response for all Products",data);
      setProducts(data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleShopNow = async (product) => {
    try {
      console.log("Product selected:", product);
  
      if (product?.vendor?.[0]?._id) {
        console.log("Storing vendorId in localStorage:", product?.vendor?.[0]?._id);
        localStorage.setItem("vendorId", product?.vendor?.[0]?._id); // Store vendorId
      } else {
        console.warn("No vendorId found for this product.");
      }
  
      onSelectProduct(product); // Pass product to parent component
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };
  


  return (
    <div className="product-container">
      <h2>All Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.productName}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Quantity:</strong> {product.quantity || "N/A"}</p>
                <p><strong>Color:</strong> {product.color || "N/A"}</p>
                <div className="btnShopNow">
               <button type='submit' onClick={()=>handleShopNow(product)}>Shop Now</button>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default AllFarmersProducts;
