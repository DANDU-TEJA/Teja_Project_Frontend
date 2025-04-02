import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
//import { ThreeCircles } from 'react-loader-spinner';

const Register = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [district,setDistrict]=useState("");
  const [mandal,setMandal]=useState("");
  const [village,setVillage]=useState("");
  const [survey,setSurvey]=useState("");

  const [phone,setPhone]=useState("");
  const [location,setLocation]=useState("");
  const [error, setError] = useState("");
  
   

  const handleSubmit = async (e) => {
    e.preventDefault();

       //Validations 
      
  // 1. Check if any field is empty
  if (!username || !phone || !email || !password || !district || !mandal || !village || !survey || !location) {
    alert("Please Fill All The Required fields!");
    return;
  }
    // 2. Username Validation (Only letters and spaces)
    const usernameRegex = /^[A-Za-z\s]+$/;
    if (!usernameRegex.test(username)) {
      alert("Username must only contain letters and spaces. No special characters allowed.");
      return;
    }
     
     // 3. Phone Number Validation (Exactly 10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

        // 4. Email Validation (Proper email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const districtRegex = /^[A-Za-z\s]+$/;
    if (!districtRegex.test(district)) {
      alert("District name must only contain letters and spaces. No special characters allowed.");
      return;
    }
    const mandalRegex = /^[A-Za-z\s]+$/;
    if (!mandalRegex.test(mandal)) {
      alert("Mandal name must only contain letters and spaces. No special characters allowed.");
      return;
    }
    const villageRegex = /^[A-Za-z\s]+$/;
    if (!villageRegex.test(village)) {
      alert("Village name must only contain letters and spaces. No special characters allowed.");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username,phone, email, password,district,mandal,village,survey,location })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);

         // Store email and password in localStorage
      localStorage.setItem("registeredEmail", email);
      localStorage.setItem("registeredPassword", password);

        setUsername("");
        setEmail("");
        setPassword("");
        setDistrict("");
        setMandal("");
        setVillage("");
        setSurvey("");
        setPhone("");
        setLocation("");

        alert("Farmer registered successfully");
        onSuccess(); //New Change
      } else {
        setError(data.error);
        alert("Registration Failed,This Data Already Exist Contact Admin")
      }
    } catch (error) {
      console.error("Registration failed in register.jsx", error);
      alert("Registration failed ");
     }
  };

  return (
    <div className="registerSection">
{<form className='authForm' onSubmit={handleSubmit} >

<h3>Farmer Register</h3>
<label>Username<span style={{ color: 'red' }}>*</span></label>
<input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your name' /><br />

<label>Phone No.<span style={{ color: 'red' }}>*</span></label>
<input type="text" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='enter phone number'/><br/>

<label>Email<span style={{ color: 'red' }}>*</span></label>
<input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />

<label>Password<span style={{color:'red'}}>*</span></label>
<input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='enter your password' /><br />

<label>District<span style={{ color: 'red' }}>*</span></label>
<input type="text" name='district' value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='enter your District Name' /><br />

<label>Mandal<span style={{ color: 'red' }}>*</span></label>
<input type="text" name='mandal' value={mandal} onChange={(e) => setMandal(e.target.value)} placeholder='enter your mandal name' /><br />

<label>Village<span style={{ color: 'red' }}>*</span></label>
<input type="text" name='village' value={village} onChange={(e) => setVillage(e.target.value)} placeholder='enter your Village name' /><br />

<label>Survey No./Sub-Division No.<span className='mandatoryField'>*</span></label>
<input type="text" name='survey' value={survey} onChange={(e) => setSurvey(e.target.value)} placeholder='enter your Survey No./Sub-division No.' /><br />

<label>Location<span style={{ color: 'red' }}>*</span></label>
<input type='text' name='location' value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Your Location URL'/><br/>

<div className="btnsubmit">
  <button type='submit'>Submit</button>
</div>
</form>}
  
    </div>
  ); 
};

export default Register;

