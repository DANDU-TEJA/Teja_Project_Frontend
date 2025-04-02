import React from 'react';

const NavBar = ({ onLogin, onRegister, isLoggedIn, onLogout }) => {
  return (
    <div className="navSection">
      <div className="companyLogo"></div>
      <div className="Title">
        <h4>Crop Connect</h4>
        <p className='subTitle'>A Mern Stack Platform For Direct Agricultural Sales</p>
      </div>
      <div className="userAuth">
        {!isLoggedIn ? (
          <>
            <span onClick={onLogin}>Login / </span>
            <span onClick={onRegister}>Register</span>
          </>
        ) : (
          <span onClick={onLogout} className="logout">Logout</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
