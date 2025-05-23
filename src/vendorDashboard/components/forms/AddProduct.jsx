import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProduct = ({onSuccess}) => {
  console.log("Rendering AddProduct Component");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color,setColor]=useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl,setImageUrl]=useState("");

  const handleBestSeller = (event) => {
    setBestSeller(event.target.value === "true");
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage); //upload
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName) {
      alert("Please Enter Your Product Name..");
      return;
    }
    if(!price){
      alert("Please Enter The Price..")
      return;
    }
    
    if(!quantity){
      alert("Please Enter The Quantity in KGs..")
      return;
    }

    if(!color){
      alert("Please Enter The Color of Your Product..")
      return;
    }

    if(!description){
      alert("Please Provide Small Description About Your Product..")
      return;
    }

    if(!image){
      alert("Please Upload Your Product Image..")
      return;
    }

    try {
      const loggedInVendorId = localStorage.getItem("loggedInVendorId"); // New Change
    
      console.log("This is vendor Id", loggedInVendorId); // New Change
      if (!loggedInVendorId) {
        console.error("User not authenticated");
        return;
      }
    
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("color", color);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      formData.append("image", image); // Upload
      formData.append("imageUrl", imageUrl); // URL
    
      console.log("Sending API Request to:", `${API_URL}/product/add-product/${loggedInVendorId}`);
      console.log("Form Data:", Object.fromEntries(formData.entries())); // Log the form data
    
      const response = await fetch(`${API_URL}/product/add-product/${loggedInVendorId}`, {
        method: "POST",
        body: formData,
      });
    
      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Body:", responseText);
    
      if (response.ok) {
        alert("Product added successfully");
        onSuccess(); // New Change
      } else {
        alert("Failed to add product: " + responseText); // Log the actual error message
      }
    
      setProductName("");
      setPrice("");
      setQuantity("");
      setColor("");
      setBestSeller(false);
      setImage(null);
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add Product in AddProduct: " + error.message);
    }
    
  };

  return (
    <div className="add-product">
      <form onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name<span className='mandatoryField'>*</span></label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />

        <label>Price<span className='mandatoryField'>*</span></label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        
        <label>Quantity<span className='mandatoryField'>*</span></label>
        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <label>Color<span className='mandatoryField'>*</span></label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        

        <div className="checkInp">
          <label>Own Land</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Yes</label>
              <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSeller} />
            </div>
            <div className="checboxContainer">
              <label>No</label>
              <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} />
            </div>
          </div>
        </div>

        <label>Description<span className='mandatoryField'>*</span></label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Product Image (Upload)<span className='mandatoryField'>*</span></label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <label>Image URL</label>
        <input type="text" value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} placeholder="Image URL"/>

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
