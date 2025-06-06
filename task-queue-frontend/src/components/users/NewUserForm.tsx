import React from "react";
import type { User } from "../../redux/userReducer/userReducer";

interface propType {
  newUser: User;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
}

const NewUserForm: React.FC<propType> = ({ newUser, setNewUser }) => {
  return (
    <div className="w-full space-y-2">
      <div className="w-full flex space-x-2">
        <div className="w-1/2">
          <label>First Name</label>
          <input
            type="text"
            value={newUser.firstName}
            onChange={(e: any) =>
              setNewUser((pre: User) => ({ ...pre, firstName: e.target.value }))
            }
            className="w-full p-1 outline-blue-500 border border-gray-500 rounded-md"
          />
        </div>
        <div className="w-1/2">
          <label>Last Name</label>
          <input
            type="text"
            value={newUser.lastName}
            onChange={(e: any) =>
              setNewUser((pre: User) => ({ ...pre, lastName: e.target.value }))
            }
            className="w-full p-1 outline-blue-500 border border-gray-500 rounded-md"
          />
        </div>
      </div>
      <div className="w-full">
        <label>User Name</label>
        <input
          type="text"
          value={newUser.userName}
          onChange={(e: any) =>
            setNewUser((pre: User) => ({ ...pre, userName: e.target.value }))
          }
          className="w-full p-1 outline-blue-500 border border-gray-500 rounded-md"
        />
      </div>
      <div className="w-full">
        <label>Password</label>
        <input
          type="text"
          value={newUser.password}
          onChange={(e: any) =>
            setNewUser((pre: User) => ({ ...pre, password: e.target.value }))
          }
          className="w-full p-1 outline-blue-500 border border-gray-500 rounded-md"
        />
      </div>
      <div className="w-full">
        <label>User type</label>

        <select
          onChange={(e: any) =>
            setNewUser((pre: User) => ({ ...pre, type: e.target.value }))
          }
          defaultValue={newUser.type}
          className="w-full p-1 outline-blue-500 border border-gray-500 rounded-md"
        >
          <option value={"admin"}>Admin</option>
          <option value={"member"}>Member</option>
        </select>
      </div>
    </div>
  );
};

export default NewUserForm;
