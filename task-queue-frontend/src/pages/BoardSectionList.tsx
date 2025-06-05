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
import { findBoardSectionContainer } from "../utils/Board";
import BoardSection from "../components/board/BoardSection";
import TaskItem from "../components/board/TaskItem";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewColumn,
  editTask,
  onDragEnd,
  reArangeTask,
} from "../redux/boardReducer/action";
import type { AppDispatch } from "../redux/store";
import Modal from "../components/common/Modal";
import EditTaskForm from "../components/board/EditTaskForm";

export type Status = "backlog" | "in progress" | "done";
export type Tags = "Feature" | "Bug" | "Enhancement";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  tag?: Tags
};

export type BoardSectionsType = {
  [name: string]: Task[];
};

const BoardSectionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const boardSections = useSelector((state: any) => state.boardReducer);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const [activeContainer, setActiveContainer] = useState<null | string>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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

    const activeIndex = boardSections[activeContainer].findIndex(
      (task: any) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
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
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task =
    activeTaskId && activeContainer
      ? getTaskById(boardSections[activeContainer], activeTaskId)
      : null;

  const addColumn = () => {
    let newColumn = `Column ${Object.keys(boardSections).length}`;
    dispatch(addNewColumn(newColumn));
  };

  useEffect(() => {
    console.log(boardSections);
  }, [boardSections]);

  const opnEditCardModal = (task: Task) => {
    setEditModalOpen(true);
    setActiveTask(task);
  };

  const editTaskHandler = () => {
    activeTask && dispatch(editTask(activeTask));
    setActiveTask(null);
    setEditModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <span className="text-lg text-gray-500">All boards</span>
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
        <div className="w-full flex flex-nowrap overflow-x-auto gap-5 min-h-screen mt-5">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <BoardSection
              key={boardSectionKey}
              id={boardSectionKey}
              title={boardSectionKey}
              tasks={boardSections[boardSectionKey]}
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
      >
        {activeTask && (
          <EditTaskForm task={activeTask} setActiveTask={setActiveTask} setEditModalOpen={setEditModalOpen} />
        )}
      </Modal>
    </div>
  );
};

export default BoardSectionList;
