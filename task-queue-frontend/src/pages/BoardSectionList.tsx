import React, { useEffect, useState } from "react";

import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { getTaskById } from "../utils/Task";
import {
  checkForReuiredFiled,
  findBoardSectionContainer,
} from "../utils/Board";
import BoardSection from "../components/board/BoardSection";
import TaskItem from "../components/board/TaskItem";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewColumn,
  editTask,
  getColumnList,
  onDragEnd,
  reArangeTask,
} from "../redux/boardReducer/action";
import type { AppDispatch } from "../redux/store";
import Modal, { type FormError } from "../components/common/Modal";
import EditTaskForm from "../components/board/EditTaskForm";
import { useParams } from "react-router";
import {
  getBoardFromLocalStorage,
  type Board,
} from "../components/board/BoardList";

export type Status = "backlog" | "in progress" | "done";
export type Tags = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  tag?: Tags;
  users?: Array<{ id: string; name: string }>;
  dueDate?: string;
  createdBy?: { id?:string; name?: string };
};

export type BoardSectionsType = {
  [name: string]: { title: string; task: Task[] };
};

const setActiveBoardId = (id: string) => {
  localStorage.setItem("activeBordId", JSON.stringify(id));
};

const updateLocalStorageboard = (boardId: any, data: BoardSectionsType) => {
  if (boardId) {
    let allBoard: any[] = JSON.parse(localStorage.getItem("boardList") as any);
    allBoard = allBoard.map((board: any) => {
      if (board.id === boardId) {
        return {
          ...board,
          columns: data,
        };
      }
      return board;
    });
    localStorage.setItem("boardList", JSON.stringify(allBoard));
  }
};

const BoardSectionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const boardSections = useSelector((state: any) => state.boardReducer);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const [activeContainer, setActiveContainer] = useState<null | string>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [currenBoard, setCurrentBoard] = useState<Board | null>(null);
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: [],
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setActiveBoardId(id);
      let board = getBoardFromLocalStorage(id);
      setCurrentBoard(board);
    }

    dispatch(getColumnList());
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers

    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    setActiveContainer(activeContainer);
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    dispatch(
      reArangeTask({
        activeContainer,
        overContainer,
        active: active.id,
        over: over?.id,
      })
    );
    updateLocalStorageboard(id, boardSections);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].task.findIndex(
      (task: any) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].task.findIndex(
      (task: any) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      dispatch(
        onDragEnd({
          activeContainer,
          overContainer,
          active: active.id,
          over: over?.id,
        })
      );
    }

    setActiveTaskId(null);
    setActiveContainer(null);
    if (id) {
      updateLocalStorageboard(id, boardSections);
    }
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task =
    activeTaskId && activeContainer
      ? getTaskById(boardSections[activeContainer].task, activeTaskId)
      : null;

  const addColumn = () => {
    let newColumn = `Column ${Object.keys(boardSections).length}`;
    dispatch(addNewColumn(newColumn));
  };

  useEffect(() => {
    if (id) {
      updateLocalStorageboard(id, boardSections);
    }
    return () => updateLocalStorageboard(id, boardSections);
  });

  const opnEditCardModal = (task: Task) => {
    setEditModalOpen(true);
    setActiveTask(task);
  };

  const editTaskHandler = () => {
    if (activeTask) {
      let check = checkForReuiredFiled(["title"], activeTask);
      if (check) {
        dispatch(editTask(activeTask));
        setActiveTask(null);
        setEditModalOpen(false);
        setFormError({ error: false, message: [] });
      } else {
        setFormError({
          error: true,
          message: ["title"].map((m) => `${m.toLocaleUpperCase()} is required`),
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between my-2">
        <span className="text-lg text-gray-800 font-bold">
          {currenBoard && currenBoard.name}
        </span>
        <button
          className="p-1 px-2 bg-blue-500 text-white rounded flex items-center gap-2 cursor-pointer hover:bg-blue-600"
          onClick={addColumn}
        >
          <FaPlus /> New Column
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-full flex flex-nowrap overflow-x-auto gap-5">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <BoardSection
              key={boardSectionKey}
              id={boardSectionKey}
              title={boardSections[boardSectionKey].title}
              tasks={boardSections[boardSectionKey].task}
            />
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? (
              <TaskItem task={task} clickHandler={opnEditCardModal} />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>

      <Modal
        open={editModalOpen}
        title="Edit Task"
        handleCloseModal={() => setEditModalOpen(false)}
        submitHandler={editTaskHandler}
        formError={formError}
      >
        {activeTask && (
          <EditTaskForm
            task={activeTask}
            setActiveTask={setActiveTask}
            setEditModalOpen={setEditModalOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default BoardSectionList;
