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

    try {

      const loggedInVendorId=localStorage.getItem("loggedInVendorId");//New Change


      console.log("This is vendor Id",loggedInVendorId);//New Cahnge
      if (!loggedInVendorId) { //updated Condition
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("quantity",quantity);
      formData.append("color",color);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      
        formData.append("image", image); //upload
      
        formData.append("imageUrl",imageUrl);//url
  
      

      console.log("This Is Vendor Id",loggedInVendorId);//New Change
      const response = await fetch(`${API_URL}/product/add-product/${loggedInVendorId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Product added successfully");
        onSuccess()//New Change3/6/25
        
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
      alert("Failed to add Product in AddProduct");
    }
  };

  return (
    <div className="add-product">
      <form onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />

        <label>Price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        
        <label>Quantity</label>
        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <label>Color</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        

        <div className="checkInp">
          <label>Best Seller</label>
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

        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Product Image (Upload)</label>
        <input type="file" onChange={handleImageUpload} />

        <label>OR Image URL</label>
        <input type="text" value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} placeholder="Image URL"/>

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
