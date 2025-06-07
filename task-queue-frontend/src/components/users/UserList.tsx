import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { User } from "../../redux/userReducer/userReducer";
import { updateUserLocalStorage } from "../../utils/User";
import Modal, { type FormError } from "../common/Modal";
import NewUserForm from "./NewUserForm";
import { DEFAULT_USER } from "../../pages/Users";
import type { AppDispatch } from "../../redux/store";
import { editUser, removeUser } from "../../redux/userReducer/action";
import { IoWarningOutline } from "react-icons/io5";
import { checkForReuiredFiled } from "../../utils/Board";

const UserList: React.FC = () => {
  const userList: User[] = useSelector((state: any) => state.userReducer);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [user, setEditUser] = useState<User>(DEFAULT_USER);
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: [],
  });

  const dispatch = useDispatch<AppDispatch>();
  const handleEditUser = (user: User) => {
    setOpenEditModal(true);
    setEditUser(user);
  };

  const submitHandler = () => {
    let fileds = ["firstName", "lastName", "userName", "password"];
    let check = checkForReuiredFiled(fileds, user);
    if (check) {
      dispatch(editUser(user));
      setOpenEditModal(false);
      setFormError({ error: false, message: [] });
    } else {
      setFormError({
        error: true,
        message: fileds.map((m) => `${m.toLocaleUpperCase()} is required`),
      });
    }
  };

  const handleDeleteUser = (id: string) => {
    setCurrentUserId(id);
    setConfirmationModalOpen(true);
  };

  const handleConfirmation = () => {
    if (currentUserId) {
      dispatch(removeUser(currentUserId));
      setConfirmationModalOpen(false);
      setCurrentUserId(null);
    }
  };

  useEffect(() => {
    updateUserLocalStorage(userList);
  }, [userList]);
  return (
    <div className="w-full mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-sm ">
          <thead>
            <tr className="text-sm text-gray-800 font-normal rounded-xl uppercase bg-gray-200">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-center">Type</th>
              <th className="px-6 py-3 text-center">User Name</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user: User) => (
              <tr
                key={user.id}
                className="text-gray-700 text-sm border-b-1 border-gray-200"
              >
                <td className="px-3 py-4 whitespace-nowrap font-medium text-blue-500">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  {user.type.toUpperCase()}
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500">
                  {user.userName}
                </td>
                <td className="px-5 py-4 text-right space-x-3">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600 hover:text-blue-800 text-lg cursor-pointer "
                  >
                    <FiEdit className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700 text-lg cursor-pointer"
                  >
                    <FiTrash2 className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={openEditModal}
        title="Edit User"
        handleCloseModal={() => setOpenEditModal(false)}
        submitHandler={submitHandler}
        formError={formError}

      >
        <NewUserForm newUser={user} setNewUser={setEditUser} />
      </Modal>

      <Modal
        open={confirmationModalOpen}
        title="Confirm"
        handleCloseModal={setConfirmationModalOpen}
        confirmation={true}
        submitHandler={handleConfirmation}
      >
        <div className="w-full flex justify-center flex-col">
          <div className="w-full flex justify-center text-5xl text-red-400">
            <IoWarningOutline />
          </div>
          <span className="text-lg text-center">
            Are you sure want to delete
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
