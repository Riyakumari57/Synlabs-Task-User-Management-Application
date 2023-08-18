import axios from "axios";
import { useState } from "react";

const CreateUser = ({setCreateNewuser , users, setUsers}) => {

      const newData = {
        id:10,
        name : "",
        email:"",
        address: {
          city :"",
        },
      }
    const [inputData , setInputData] = useState(newData);


    const submitChanges = ()=>{
      setCreateNewuser(false);
      axios.post("https://jsonplaceholder.typicode.com/users", inputData).
      then((response)=>{
        console.log(response);

        setUsers([...users , inputData])
      }) .catch(error => {
        console.error("Error adding  user:", error);
    });
    }
    
    const incrementId = () => {
      setInputData((prevInputData) => ({
        ...prevInputData,
        id: prevInputData.id + 1,
      }));
    };

  return (
     <>
     <div className="modal-wrapper"></div>
        <div className="modal-container">
       
      <form onSubmit={(e) => {
        e.preventDefault();
        incrementId();
        submitChanges()}}>
        <div className="section">
        <label>Name</label>
      <input type="text" value={inputData.name} onChange={(e)=>setInputData({...inputData,name :e.target.value})}
      />
        </div>
      
      <div className="section">
      <label>email</label>
      <input type="email" value={inputData.email} onChange={(e)=>setInputData({...inputData,email:e.target.value} )}
      />
      </div>
      

      <div className="section">
      <label>Address(City)</label>
      <input type="text"  value={inputData.address.city} onChange={(e)=>setInputData({...inputData, address:{...inputData.address,city: e.target.value}})}
      /> 
      </div>
     
      <div className="buttons">
      <button className="btn" onClick={()=>setCreateNewuser(false)}>Close</button>
      <button className="btn" type="submit">Submit</button>
      </div>
      </form>
    
    </div>
     </>
  )
}

export default CreateUser
