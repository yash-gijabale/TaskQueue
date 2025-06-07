import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  open: boolean;
  handleCloseModal: any;
  submitHandler?: any;
  title: string;
  children: any;
  confirmation?: boolean;
}
const Modal: React.FC<ModalProps> = ({
  open,
  handleCloseModal,
  submitHandler,
  title,
  children,
  confirmation,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscKey = (e: any) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    open && (
      <div
        ref={modalRef}
        tabIndex={1}
        onKeyDown={handleEscKey}
        className="w-screen fixed h-screen inset-0 bg-black/20 flex z-50 justify-center items-center"
      >
        <div
          className="w-[90%] m-auto md:w-[40%] rounded bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-10 p-6 px-3 border-b-1 border-gray-200 flex items-center justify-between">
            <span className="text-lg">{title}</span>
            <button
              className="p-1 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              onClick={() => handleCloseModal()}
            >
              <IoClose className="text-xl" />
            </button>
          </div>
          <div className="w-full min-h-10 p-3 max-h-[80vh] overflow-y-auto">
            {children}
          </div>
          <div className="w-full flex justify-end p-3 space-x-2">
            <button
              className="p-1 px-3 bg-gray-200 rounded text-black cursor-pointer hover:bg-gray-300"
              onClick={() => handleCloseModal()}
            >
              Cancle
            </button>
            {!confirmation ? (
              <button
                className="p-1 px-3 bg-blue-500 rounded text-white cursor-pointer hover:bg-blue-600"
                onClick={submitHandler}
              >
                {title}
              </button>
            ) : (
              <button
                className="p-1 px-3 bg-red-500 rounded text-white cursor-pointer hover:bg-red-600"
                onClick={submitHandler}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
