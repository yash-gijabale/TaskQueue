import React from "react";

interface Props {
  formData: {
    boardName: string;
    boardDesc: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      boardName: string;
      boardDesc: string;
    }>
  >;
}

const NewBoardForm: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-5">
        <div className="full flex flex-col">
          <label>Board Name</label>
          <input
            type="text"
            placeholder="Board name"
            name="boardName"
            value={formData.boardName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, boardName: e.target.value }))
            }
            className="p-2 rounded outline-blue-500 border-1 border-gray-400"
          ></input>
        </div>
        <div className="full flex flex-col">
          <label>Board Description</label>
          <textarea
            placeholder="Board description"
            name="boardDesc"
            value={formData.boardDesc}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, boardDesc: e.target.value }))
            }
            className="p-2  rounded outline-blue-500  border-1 border-gray-400"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default NewBoardForm;
