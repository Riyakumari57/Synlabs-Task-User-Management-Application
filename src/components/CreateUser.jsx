import axios from "axios";
import { useState } from "react";

const CreateUser = ({setCreateNewuser , users, setUsers}) => {

      const newData = { //Here we are creating a object which will get added in the exisiting data 
        name : "",
        email:"",
        address: {
          city :"",
        },
      }
    const [inputData , setInputData] = useState(newData);
    const [id, setId] = useState(10);
    const newUser = {
      ...inputData,
      id: users.length + 1, // Increment the id based on the current number of users
    };

    const submitChanges = ()=>{ //Performing Post request on the submittion of the form which will add the new user to the form
      setCreateNewuser(false);
      axios.post("https://jsonplaceholder.typicode.com/users", {...inputData ,
    id}).then((response)=>{
        console.log(response);

        setUsers([...users, newUser]);
      }) .catch(error => {
        console.error("Error adding  user:", error);
    });
    }

  return (
     <>
     <div className="modal-wrapper"></div>
        <div className="modal-container">
       
      <form onSubmit={(e) => {
        e.preventDefault();
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
