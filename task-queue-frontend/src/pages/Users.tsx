import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import UserList from "../components/users/UserList";
import Modal, { type FormError } from "../components/common/Modal";
import NewUserForm from "../components/users/NewUserForm";
import type { User } from "../redux/userReducer/userReducer";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { createUser } from "../redux/userReducer/action";
import { checkForReuiredFiled } from "../utils/Board";

export const DEFAULT_USER: User = {
  id: "",
  password: "",
  userName: "",
  firstName: "",
  lastName: "",
  type: "member",
};

const Users: React.FC = () => {
  const [newUser, setNewUser] = useState<User>(DEFAULT_USER);
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: [],
  });
  const [createUserModalOpen, setCreateUserModalOpen] =
    useState<boolean>(false);

  const handleModalClose = () => {
    setCreateUserModalOpen(false);
    setFormError({ error: false, message: [] });
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmitUser = () => {
    let user = { ...newUser };
    user.id = uuidv4();
    let fileds = ["firstName", "lastName", "userName", "password"];
    let check = checkForReuiredFiled(fileds, user);
    if (check) {
      dispatch(createUser(user));
      setCreateUserModalOpen(false);
      setNewUser(DEFAULT_USER);
      setFormError({ error: false, message: [] });
    } else {
      setFormError({
        error: true,
        message: fileds.map((m) => `${m.toLocaleUpperCase()} is required`),
      });
    }
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <span className="text-lg text-gray-800">All Users</span>
        <button
          className="p-1 px-2 bg-blue-500 text-white rounded flex items-center gap-2 cursor-pointer hover:bg-blue-600"
          onClick={() => setCreateUserModalOpen(true)}
        >
          <FaPlus /> New User
        </button>
      </div>
      <div className="full">
        <UserList />
      </div>

      <Modal
        open={createUserModalOpen}
        title="Create User"
        handleCloseModal={handleModalClose}
        submitHandler={handleSubmitUser}
        formError={formError}
      >
        <NewUserForm setNewUser={setNewUser} newUser={newUser} />
      </Modal>
    </div>
  );
};

export default Users;
