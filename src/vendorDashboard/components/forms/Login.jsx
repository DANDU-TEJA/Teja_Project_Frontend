import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';



const Login = ({onSuccess}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginHandler = async(e)=>{
      e.preventDefault();

    
      try {
          const response = await fetch(`${API_URL}/vendor/login`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
          });

          const data = await response.json();
          console.log("Lets Check What is This Data",data);

          if(!response.ok){
            alert('Incorrect Email or Password');
            return;
          }
          alert("Login Successful");
          setEmail("");
          setPassword("");

          localStorage.setItem('isLoggedIn','true');//set login Flag
          localStorage.setItem('loggedInVendorId',data.vendorId);
          
          console.log("checking for localstorage VendorId:",data.vendorId);
          
          const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${data.vendorId}`)
          const vendorData = await vendorResponse.json();
          console.log("Lets Check Vendor Data",vendorData);
          
          
          if(vendorResponse.ok){
           // localStorage.setItem("loggedInVendorId",data.vendorId);
            localStorage.setItem('vendorName',vendorData.vendor.username);
            console.log('vendor Name Stored:',vendorData.vendor.username);
          }
          onSuccess();
      } catch (error) {
          alert("login fail due To error in LoginHandler");
          console.log(error);
      } 

  };

  return (
    <div className="loginSection">

     {    <form  className='authform' onSubmit={loginHandler} autoComplete='off'>
        <h3> Login</h3>
            <label>Email</label>
            <input type="text" name='email' value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br />
            <label>Password</label>
            <input type={"password"} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br />
            
    <div className="btnSubmit">
        <button type= 'submit'>Submit</button>
    </div>
      <p>Dont't Have An Account Please Register</p>
        </form>}
    </div>
  )
}

export default Login