import React from "react";

const SideBar = ({ onNavigate, isLoggedIn, showAddFirm }) => {
  return (
    <div className="sideBarSection">
      <h2>MENU</h2>
      <ul>
        <li onClick={() => onNavigate('home')}>Home</li>
        {showAddFirm && <li onClick={() => onNavigate('addFirm')}>Add Crop</li>}
        <li onClick={() => onNavigate('addProduct')}>Add Your Product</li>
        <li onClick={() => onNavigate('allProducts')}>See Your Products</li>
      </ul>
    </div>
  );
};

export default SideBar;
