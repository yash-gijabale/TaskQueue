import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";

interface Board {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

const mockBoards: Board[] = [
  {
    id: 1,
    name: "Product Roadmap",
    description: "Plan for upcoming features and releases.",
    createdAt: "2025-06-01",
  },
  {
    id: 2,
    name: "Marketing Campaign",
    description: "Tasks and ideas for our next big launch.",
    createdAt: "2025-05-22",
  },
  {
    id: 3,
    name: "Design Sprint",
    description: "UX and UI designs for next quarter.",
    createdAt: "2025-05-15",
  },
];

const BoardList: React.FC = () => {
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
            {mockBoards.map((board) => (
              <tr
                key={board.id}
                className='text-gray-700 text-sm border-b-1 border-gray-200'
              >
                <td className="px-3 py-4 whitespace-nowrap font-medium text-blue-500">
                  <Link to={`/board/${board.id}`}>{board.name}</Link>
                </td>
                <td className="px-3 py-4">{board.description}</td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {board.createdAt}
                </td>
                <td className="px-3 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FiEdit className="inline-block" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardList;
