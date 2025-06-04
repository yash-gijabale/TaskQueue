import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "../components/common/Modal";
import NewBoardForm from "../components/board/NewBoardForm";
import BoardList from "../components/board/BoardList";

const initialBoardForm = {
  boardName: "",
  boardDesc: "",
};

const BoardView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialBoardForm);

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData(initialBoardForm);
  };

  const handleCreateBoard = () => {
    console.log("Form submitted with:", formData);
    // Add board creation logic here (API call, update state, etc.)
    // Optionally reset form
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
