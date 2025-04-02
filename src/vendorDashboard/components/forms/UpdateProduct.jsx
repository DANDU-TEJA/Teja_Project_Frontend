import React, { useState } from 'react';

const UpdateProduct = ({ product, onUpdate, onCancel }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate(updatedProduct);
    };

    return (
        <form onSubmit={handleSubmit} className="update-product-form">
            <h2 className="form-heading">Update Product</h2>

            <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                    type="text"
                    name="productName"
                    value={updatedProduct.productName}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Price</label>
                <input
                    type="text"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                    type="text"
                    name="quantity"
                    value={updatedProduct.quantity}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Color</label>
                <input
                    type="text"
                    name="color"
                    value={updatedProduct.color}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">
                    Description
                </label>
                <input
                    type="text"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={updatedProduct.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-buttons">
                <button type="submit" className="form-button update-button">
                    Update
                </button>
                <button type="button" className="form-button cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UpdateProduct;
