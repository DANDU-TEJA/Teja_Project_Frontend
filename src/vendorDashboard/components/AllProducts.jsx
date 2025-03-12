import React,{useState, useEffect} from 'react'
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
    const [products, setProducts]= useState([]);
    
    const loggedInVendorId=localStorage.getItem('loggedInVendorId');//Here The login VendorId is retrived


    const productsHandler = async()=>{
        if(!loggedInVendorId){
            console.log("No Vendor Id Found. Please login");
            alert("no vendorId is Found Please Login ");
            return;
        }
           // const productId = localStorage.getItem('vendorId');
        try {
                const response = await fetch(`${API_URL}/product/get-product/${loggedInVendorId}`);//getting This Vendor Id from Login.jsx or Its Not Coming From Login
                if(!response.ok){
                    throw new Error("Failed to Fetch Products");
                }
                
                const newProductsData = await response.json();
                setProducts(newProductsData.products);
                console.log("Fetched products",newProductsData);
        } catch (error) {
            console.error("failed to fetch products", error);
            alert('failed to fetch products');
        }
    };

    useEffect(()=>{
        productsHandler()
        console.log('this is useEffect')
    },[])

    const deleteProductById = async(productId)=>{
                try {
                        const response = await fetch(`${API_URL}/product/${productId}`,{
                            method: 'DELETE'
                        })
                    if(response.ok){
                        
                        setProducts(products.filter(product =>product._id !== productId));
                        confirm("are you sure, you want to delete?")
                        alert("Product deleted Successfully")
                    }
                } catch (error) {
                    console.error('Failed to delete product');
                    alert('Failed to delete product')
                }
    }

    
  return (
    <div className='productSection'>
        {!products ? (
            <p>No products added</p>
        ) : (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {products.map((item)=>{
                        
                            return (
                                <>
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>₹{item.price}</td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                    <td>
                                        <button onClick={()=>deleteProductById(item._id)}
                                        className='deleteBtn'
                                        >Delete</button>
                                    </td>
                                    </tr>
                                </>
                            )
                    })}
                </tbody>
            </table>
         )}
    </div>
  )
}

export default AllProducts;