
import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';



const AddFirm = ({onSuccess}) => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);



  const handleCategoryChange = (event)=>{
      const value = event.target.value;
        if(category.includes(value)){
          setCategory(category.filter((item)=> item !== value));
        }else{
          setCategory([...category, value])
        }
  }
  const handleRegionChange = (event)=>{
      const value = event.target.value;
        if(region.includes(value)){
          setRegion(region.filter((item)=> item !== value));
        }else{
          setRegion([...region, value])
        }
  }
 

  const handleFirmSubmit= async(e)=>{
        e.preventDefault();


   try {
    console.log("Fetching Api.....");
        const loginToken = localStorage.getItem('loginToken');
        if(!loginToken){
            console.error("User not authenticated");
        }

        const formData = new FormData();
          formData.append('firmName', firmName);
          formData.append('area', area);
          formData.append('offer', offer);
          formData.append('image', file)

          category.forEach((value)=>{
            formData.append('category', value)
          });
          region.forEach((value)=>{
            formData.append('region', value)
          })
          console.log(loginToken);

          const response = await fetch(`${API_URL}/firm/add-firm`,{
            method:'POST',
            headers:{
              'token': `${loginToken}`
            },
            body: formData
          });
          const data = await response.json()
          console.log(data);

          if(response.ok){
            console.log(data);
            localStorage.getItem("firmId",data.firmId);//new change 3/6/25
            onSuccess(data.firmId);//NewChange 3/6/25
            setFirmName("");
            setArea("")
            setCategory([]);
            setRegion([]);
            setOffer("");
            setFile(null)
            alert("Crop added Successfully")
            //onSuccess();
          }
          

               const mango = data.firmId;
          const vendorRestuarant = data.vendorFirmName//This Is Firm 

          localStorage.setItem('firmId', mango);
          localStorage.setItem('firmName', vendorRestuarant)
         
          

   } catch (error) {
      console.error("failed to add Crop")
      alert("failed to add Crop")
   } 
  }


  return (
        <div className="firmSection">

         {  <form className="tableForm" onSubmit={handleFirmSubmit}> 
            <h3>Add Crop</h3>
                <label >Crop Name</label>
                <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
                <label >Area</label>
                <input type="text"  name='area' value={area} onChange={(e)=>setArea(e.target.value)} />

    <div className="checkInp">
      <label >Category</label>
          <div className="inputsContainer">
          <div className="checboxContainer">
                  <label>own</label>
                  <input type="checkbox" checked ={category.includes('own')}  value="own" onChange={handleCategoryChange}/>
                </div>
                <div className="checboxContainer">
                  <label>lease</label>
                  <input type="checkbox" checked ={category.includes('lease')} value="lease" onChange={handleCategoryChange}/>
                </div>
          </div>

    </div>
    <label >Offer</label>
                <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
    <div className="checkInp">
      <br/><label >Region</label>
          <div className="inputsContainer">
          <div className="regBoxContainer">
                  <label>South-indian</label>
                  <input type="checkbox" value="south-indian"   checked ={region.includes('south-indian')}
                  onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label>North-Indian</label>
                  <input type="checkbox" value="north-indian"  checked ={region.includes('north-indian')}
                  onChange={handleRegionChange}
                  />
                </div>
          </div>

    </div>
               
            <div className="btnSubmit">
        <button type='submit'>Submit</button>
    </div>
           </form>}
        </div>
  )
}

export default AddFirm;