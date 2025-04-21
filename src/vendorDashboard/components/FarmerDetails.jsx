import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const FarmerDetails = ({ product, onBack }) => {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    console.log("Product data received in FarmerDetails:", product);
    
    let vendorId = product?.vendor?.[0]?._id || localStorage.getItem("vendorId");
  
    if (vendorId) {
      console.log("Fetching farmer details for Vendor ID:", vendorId);
      fetchFarmerDetails(vendorId);
    } else {
      console.warn("No vendorId found for this product.");
      setLoading(false);
    }
  }, [product]);

  
  const fetchFarmerDetails = async (vendorId) => {
    try {
      const response = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const data = await response.json();
      console.log("fetchFarmerDetails console log:",data);
      if(data.vendor){
      setFarmer(data.vendor);//It is A Object Inside The Product 
      }else{
        console.log("No farmer found for this data.vendor");
        setFarmer(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching farmer details:", error);
      setLoading(false);
    }
  };

  if (!product) return <p>No product selected.</p>;


  return (
    <div className="farmer-details">
       <img
        src={product.image && product.image.trim() !== "" ? `${API_URL}/uploads/${product.image}` : product.imageUrl}
        onError={(e) => { e.target.src = product.imageUrl }} // Fallback if the uploaded image fails to load
        alt={product.productName}
        className="productImage"
         />
   {/* Here I Want to Add The Image URL */}
      
      <div className="FproductDetails">
      <p>Product Name: {product.productName}</p>
      <p>Price: ₹{product.price}</p>
      
      <p>Quantity Available: {product.quantity}</p>
      <p>Color: {product.color}</p>
      <p>Verified Farmer: {product.bestSeller ? "Yes ✅":"No ❎"}</p>
      <p className="descriptionData"><b>Description:</b> {product.description}</p>
      </div>
      <h2>Farmer Details</h2>
      {loading ? (
        <p>Loading farmer details...</p>
      ) : farmer ? (
        <>
          <div className="FfarmerDetails">
          <p>Farmer Name :  {farmer.username}</p>
          <p>Phone No. {farmer.phone}</p>
          <p>Village :  {farmer.village}</p>
          <p>Mandal : {farmer.mandal}</p>
          <p>District : {farmer.district}</p>
          <p>Survey No./Sub-Division No: {farmer.survey}</p>
          <p>
            Location:{" "}
            {farmer.location ? (
            <a href={farmer.location} target="_blank" rel="noopener noreferrer">
            Click Here
            </a>
            ) : (<span style={{ color: "red" }}>Invalid Location</span>)
            }
            </p>
          </div>
          <div className="noteSection">
          <p>Note : You can verify if the seller is a certified farmer</p>
          <a href="https://dharani.telangana.gov.in/knowLandStatus" 
          target="_blank" rel="noopener noreferrer"> Click Here</a>
          </div>
        </>
      ) : (
        <p>Farmer details not available.</p>
      )}
        <button onClick={onBack} className="back-button">← Back</button>
    </div>
    
  );
};

export default FarmerDetails;
