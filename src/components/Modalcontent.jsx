import { useState } from "react"
import axios from 'axios';


//This is edit user component 

const Modalcontent = ({users ,  setUsers , setModal , selectedUserId}) => {

  const updateUser = (id , key , value)=>{
    if (key.includes(".")) {
      const [parentKey, nestedKey] = key.split(".");
      setUsers((values) =>
        values.map((item) =>
          item.id === id
            ? {
                ...item,
                [parentKey]: { ...item[parentKey], [nestedKey]: value },
              }
            : item
        )
      );
    } else {
    setUsers((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  }
}


const submitChanges = async (userId) => {
  setModal(false);
  const selectedUser = users.find((user) => user.id === userId);
  
  axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, selectedUser).then(()=>{
    console.log("User data updated successfully on the server.");
  }).catch((error)=>{
    console.error("Error updating user data:", error);
  });
}


  const selectedUser = users.find((user) => user.id === selectedUserId);

  if (!selectedUser) {
    return null;
  }
  // console.log(selectedUser);
  const { id, name, address, email } = selectedUser;
  const { city } = address;
    return (
      <>
      <div className="modal-wrapper"></div>
        <div className="modal-container">
       
      <form key={id}  onSubmit={(e) => {
        e.preventDefault();
        submitChanges(id)}}>
        <div className="section">
        <label>Name</label>
      <input type="text" value={name} onChange={(e)=>updateUser(id , "name" , e.target.value)}
      />
        </div>
      
      <div className="section">
      <label>email</label>
      <input type="email" value={email} onChange={(e)=>updateUser(id , "email" , e.target.value)}
      />
      </div>
      

      <div className="section">
      <label>Address(City)</label>
      <input type="text" value={city} onChange={(e)=>updateUser(id , "address.city" , e.target.value)} />
      </div>
     
      <div className="buttons">
      <button className="btn" onClick={()=>setModal(false)}>Close</button>
      <button className="btn" type="submit">Submit</button>
      </div>
      
      
    </form>
    
        </div>
    
      </>
    )
  }
  export default Modalcontent
