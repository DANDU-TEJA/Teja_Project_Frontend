import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
//import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';
import AllFarmersProducts from '../components/AllFarmersProducts';

import FarmerDetails from '../components/FarmerDetails';

const LandingPage = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(true); //Initially Visible
  const [selectedProduct,setSelectedProduct]=useState(null);//new Change 3/6/25
  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    setIsLoggedIn(!!loginToken);
    //setShowAddFirm(loginToken); // Show Add Firm only when (logged out) Loged in new Change
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');
      setIsLoggedIn(false);
      setShowAddFirm(true); // Show Add Firm after logout
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
    if(view == 'addFirm' && isLoggedIn){
      setCurrentView('addFirm');
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
    //setShowAddFirm(true); //Appear at Starting  Hide Add Firm after login new Change
    setCurrentView('home');
  };

  const handleFirmAdded =(firmId)=>{
    localStorage.setItem('firmId', firmId);//3/6/25 New CHange
  
    setCurrentView('addProduct');//Redirect to addproduct after addFirm
  };
  const handleProductAdded=()=>{
   // setShowAddFirm(false); //hide After Adding a Product
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
            showAddFirm={!localStorage.getItem("firmId")}
          />

          {currentView === 'home' && <AllFarmersProducts onSelectProduct={handleSelectProduct} />}
          {currentView === 'login' && <Login onSuccess={handleLoginSuccess} />}
          {currentView === 'register' && <Register onSuccess={handleRegisterSuccess} />}
          {currentView === 'addFirm' && isLoggedIn && <AddFirm onSuccess={handleFirmAdded}/>}
          {currentView === 'addProduct' && isLoggedIn && <AddProduct onSuccess={handleProductAdded} />}
          {currentView === 'allProducts' && isLoggedIn && <AllProducts />}
          {currentView === 'farmerDetails' && <FarmerDetails product={selectedProduct} onBack={()=>setCurrentView("home")}/>}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
