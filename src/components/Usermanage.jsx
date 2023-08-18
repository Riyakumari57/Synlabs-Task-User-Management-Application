import { Oval } from "react-loader-spinner";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";
import { useState, useEffect } from "react";
import Modalcontent from "./Modalcontent";
import CreateUser from "./CreateUser";
const Usermanage = () => {
  const [ loading , setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [createNewuser, setCreateNewuser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getUsers = async () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
      setLoading(true);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deletePost = (userId) => {
    console.log(userId);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        setUsers((values) => {
          return values.filter((user) => user.id !== userId);
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const editPost = (userId) => {
    console.log(userId);
    setModal(true);
    setSelectedUserId(userId);
  };

  return (
    <>
      {createNewuser && <CreateUser setCreateNewuser={setCreateNewuser} users={users} setUsers={setUsers} />}
      {modal && (
        <Modalcontent
          users={users}
          setUsers={setUsers}
          setModal={setModal}
          selectedUserId={selectedUserId}
        />
      )}
      <div className="record">
        <div className="newuser">
          <p onClick={() => setCreateNewuser(true)}>Create User</p>
          <i>
            <AiOutlineUserAdd />
          </i>
        </div>
        {loading ? (
        <table className="table">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Adress </th>
              <th>email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.address.city}</td>
                  <td>{user.email}</td>
                  <td onClick={() => editPost(user.id)} className="editRequest">
                    <AiFillEdit />
                  </td>
                  <td
                    onClick={() => deletePost(user.id)}
                    className="deleteRequest"
                  >
                    <AiFillDelete />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
      </div>
    </>
  );
};

export default Usermanage;
