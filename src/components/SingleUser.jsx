import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css"
import axios from "axios";
const SingleUser = () => {
     
    const { userId } = useParams();
    
     const [singleUser , setSingleUser] = useState({});
     const [ loading , setLoading] = useState(false);
    const getSingleUsers = async () => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => {
          setSingleUser(response.data);
          setLoading(true);
        });
      };
    
      //calling function in useEffect
      useEffect(() => {
        getSingleUsers();
      }, [userId]);

  return (
   <>
    {loading ? (
       <div className="detail">
        <div className="detail-container">
        <h1>{singleUser.name}</h1>
        <p>Username : {singleUser.username}</p>
        <p>email : {singleUser.email}</p>
        <p>wesite : {singleUser.website}</p>
        <a href={`https://jsonplaceholder.typicode.com/users/${userId}`}>Know More about the User</a>
        </div>
      
       </div>
         ) : (
            <div className="loader">
              <Oval
                height={80}
                width={80}
                color="#0d1117"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#0d1117"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          )}
   </>
  )
}

export default SingleUser
