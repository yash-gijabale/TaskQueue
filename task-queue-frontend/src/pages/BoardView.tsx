import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "../components/common/Modal";
import NewBoardForm from "../components/board/NewBoardForm";
import BoardList, { type Board } from "../components/board/BoardList";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addNewBoard, getAllBoard } from "../redux/boardListReducer/action";
import { INITISL_BOARD_COLUMNS } from "../redux/boardReducer/boardReducer";

export const initialBoardForm = {
  boardName: "",
  boardDesc: "",
};

export const updateLocalStorageBoard = (data: any) => {
  localStorage.setItem("boardList", JSON.stringify(data));
};

const BoardView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialBoardForm);
  const dispatch = useDispatch<AppDispatch>();
  const boardList = useSelector((state: any) => state.boardListReducer);

  const handleCloseModal = () => {
    setModalOpen(false);

    setFormData(initialBoardForm);
  };

  useEffect(()=>{
    dispatch(getAllBoard())
  },[])

  useEffect(() => {
    console.log(boardList)
    // updateLocalStorageBoard(boardList);
  }, [boardList]);

  const handleCreateBoard = () => {
    let newBoard: Board = {
      id: uuidv4(),
      name: formData.boardName,
      description: formData.boardDesc,
      createdAt: new Date().toISOString().substring(0, 10),
      columns: INITISL_BOARD_COLUMNS,
    };
    dispatch(addNewBoard(newBoard));
    handleCloseModal();
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <span className="text-lg text-gray-500">All boards</span>
        <button
          className="p-1 px-2 bg-blue-500 text-white rounded flex items-center gap-2 cursor-pointer hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus /> New Board
        </button>
      </div>
      <div className="w-full">
        <BoardList />
      </div>
      <Modal
        open={modalOpen}
        submitHandler={handleCreateBoard}
        handleCloseModal={handleCloseModal}
        title="Create board"
      >
        <NewBoardForm formData={formData} setFormData={setFormData} />
      </Modal>
    </div>
  );
};

export default BoardView;
