import React,{useState, useEffect} from 'react'
import { API_URL } from '../data/apiPath';
import UpdateProduct from './forms/UpdateProduct';


const AllProducts = () => {
    const [products, setProducts]= useState([]);
    const [productToUpdate,setProductToUpdate]=useState(null);

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
             const updateProductById = async (updatedProduct) => {
                try {
                    const response = await fetch(`${API_URL}/product/update-product/${updatedProduct._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            productName: updatedProduct.productName,
                            price: updatedProduct.price,
                            quantity: updatedProduct.quantity,
                            color: updatedProduct.color,
                            description: updatedProduct.description,
                            imageUrl: updatedProduct.imageUrl  // Keep existing image URL
                        })
                    });
            
                    if (!response.ok) throw new Error("Failed to update product");
            
                    const updatedProductData = await response.json();
                    console.log("Updated Product Data:", updatedProductData);
            
                    // ✅ Update products in the frontend
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product._id === updatedProductData._id ? updatedProductData : product
                        )
                    );
            
                    alert('Product updated successfully');
                    productsHandler();
                    setProductToUpdate(null);
                } catch (error) {
                    console.error('Failed to update product', error);
                    alert('Failed to update product');
                }
            };
            
            
        
  return (
    <div className='productSection'>
        {productToUpdate ? (
            <UpdateProduct
            product={productToUpdate}
            onUpdate={updateProductById}
            onCancel={()=> setProductToUpdate(null)}
            />
        ) : (!products ? (
            <p>No products Added</p>
        ):(
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Update</th>
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
                                        <button onClick={() => setProductToUpdate(item)}
                                         className='deleteBtn'>Update</button>
                                        </td>

                                        <td>
                                        <button onClick={()=>deleteProductById(item._id)}
                                        className='deleteBtn'>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                    })}
                </tbody>
            </table>
         ))}
    </div>
  )
}

export default AllProducts;