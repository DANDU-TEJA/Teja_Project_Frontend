import React from "react";

const SideBar = ({ onNavigate, isLoggedIn, }) => {
  return (
    <div className="sideBarSection">
    <h2 >MENU</h2>
      <ul>
        <li onClick={() => onNavigate('home')}>Home</li><br/>
        <li onClick={() => onNavigate('addProduct')}>Add Your Product</li><br/>
        <li onClick={() => onNavigate('allProducts')}>See Your Products</li><br/>
      </ul>
    </div>
  );
};

export default SideBar;
