import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';

import AddProduct from '../components/forms/AddProduct';

import AllProducts from '../components/AllProducts';
import AllFarmersProducts from '../components/AllFarmersProducts';

import FarmerDetails from '../components/FarmerDetails';

const LandingPage = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedProduct,setSelectedProduct]=useState(null);//new Change 3/6/25
  

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
     
      setIsLoggedIn(false);
      setCurrentView('home');
    }
  };

  const handleNavigation = (view) => {
    if (!isLoggedIn && view !=='home')  {
      if (window.confirm('Please login to continue.')) {
        setCurrentView('login');
      }
      return;
    }
    if(view == 'home'){
      setCurrentView('home');
    }else if (view === 'addProduct' && isLoggedIn){
      setCurrentView('addProduct');
    }else if(view === 'allProducts' && isLoggedIn){
      setCurrentView('allProducts');
    }else{
      setCurrentView(view);
    }
    
  };

  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);

    setCurrentView('home');
  };

  const handleProductAdded=()=>{

    setCurrentView('home');
  };
  const handleSelectProduct=(product)=>{
    setCurrentView('farmerDetails');
    setSelectedProduct(product); //switch view
  }
  return (
    <>
      <section className='landingSection'>
        <NavBar
          onLogin={() => setCurrentView('login')}
          onRegister={() => setCurrentView('register')}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <div className='collectionSection'>
          <SideBar
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
          />

          {currentView === 'home' && <AllFarmersProducts onSelectProduct={handleSelectProduct} />}
          {currentView === 'login' && <Login onSuccess={handleLoginSuccess} />}
          {currentView === 'register' && <Register onSuccess={handleRegisterSuccess} />}

          {currentView === 'addProduct' && isLoggedIn && <AddProduct onSuccess={handleProductAdded} />}
          {currentView === 'allProducts' && isLoggedIn && <AllProducts />}
          {currentView === 'farmerDetails' && <FarmerDetails product={selectedProduct} onBack={()=>setCurrentView("home")}/>}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
