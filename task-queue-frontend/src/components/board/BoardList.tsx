import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import Modal, { type FormError } from "../common/Modal";
import NewBoardForm from "./NewBoardForm";
import {
  initialBoardForm,
} from "../../pages/BoardView";
import type { BoardSectionsType } from "../../pages/BoardSectionList";
import type { AppDispatch } from "../../redux/store";
import { deleteBoard, editBoard } from "../../redux/boardListReducer/action";
import { IoWarningOutline } from "react-icons/io5";
import { checkForReuiredFiled } from "../../utils/Board";

export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  columns: BoardSectionsType;
}

export const getBoardFromLocalStorage = (id: string): Board => {
  let allBoard: any[] = JSON.parse(localStorage.getItem("boardList") as any);
  let activeBoard: Board = allBoard.find((board: any) => board.id === id);
  return activeBoard;
};

const BoardList: React.FC = () => {
  const processedBoardList = useSelector(
    (state: any) => state.boardListReducer
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialBoardForm);
  const [activeBoarId, setActiveBoardId] = useState<string | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: [],
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = () => {
    setModalOpen(false);

    setFormData(initialBoardForm);
  };

  const getActiveBoard = (id: string) => {
    let board: Board = getBoardFromLocalStorage(id);
    let boardData = {
      boardName: board.name,
      boardDesc: board.description,
    };
    setFormData(boardData);
    setModalOpen(true);
    setActiveBoardId(id);
  };

  const handleDeleteBoard = (id: string) => {
    setConfirmationModalOpen(true);
    setActiveBoardId(id);
  };

  const handleConfirmation = () => {
    if (activeBoarId) {
      dispatch(deleteBoard(activeBoarId));
      setConfirmationModalOpen(false);
      setActiveBoardId(null);
    }
  };

  const handleEditBoard = () => {
    if (activeBoarId) {
      let fileds = ["boardName"];
      let check = checkForReuiredFiled(fileds, formData);
      if (check) {
        dispatch(editBoard({ id: activeBoarId, data: formData }));
        handleCloseModal();
        setActiveBoardId(null);
        setFormError({ error: false, message: [] });
      } else {
        setFormError({
          error: true,
          message: fileds.map((m) => `${m.toLocaleUpperCase()} is required`),
        });
      }
    }
  };

  return (
    <div className="w-full mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-sm ">
          <thead>
            <tr className="text-sm text-gray-800 font-normal rounded-xl uppercase bg-gray-200">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedBoardList && processedBoardList.map((board: any) => (
              <tr
                key={board.id}
                className="text-gray-700 text-sm border-b-1 border-gray-200"
              >
                <td className="px-3 py-4 whitespace-nowrap font-medium text-blue-500">
                  <Link to={`/board/${board.id}`}>{board.name}</Link>
                </td>
                <td className="px-3 py-4">{board.description}</td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {board.createdAt}
                </td>
                <td className="px-5 py-4 text-right space-x-3">
                  <button
                    onClick={() => getActiveBoard(board.id)}
                    className="text-blue-600 hover:text-blue-800 text-lg cursor-pointer "
                  >
                    <FiEdit className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDeleteBoard(board.id)}
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
        open={modalOpen}
        submitHandler={handleEditBoard}
        handleCloseModal={handleCloseModal}
        title="Edit board"
        formError={formError}
      >
        <NewBoardForm formData={formData} setFormData={setFormData} />
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

export default BoardList;
