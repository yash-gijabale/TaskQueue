import React, { useEffect, useMemo, useRef, useState } from "react";

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
import type { User } from "../redux/userReducer/userReducer";

export type Status = "backlog" | "in progress" | "done";
export type Tags = "high" | "medium" | "low";
type Sort = "all" | "needToComplete" | "upcomming";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  tag?: Tags;
  users?: Array<{ id: string; name: string }>;
  dueDate?: string;
  createdBy?: { id?: string; name?: string };
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
  const users: User[] = useSelector((state: any) => state.userReducer);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const [activeContainer, setActiveContainer] = useState<null | string>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [currenBoard, setCurrentBoard] = useState<Board | null>(null);
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: [],
  });

  const [filters, setFilters] = useState({
    priority: "all",
    assinee: "all",
    sort: "all",
  });

  const [search, setSearch] = useState<string>("");

  let filteredBoardSections: BoardSectionsType = useMemo(() => {
    let boards: BoardSectionsType = JSON.parse(JSON.stringify(boardSections));
    if (filters.priority !== "all") {
      Object.keys(boards).map((boardSectionKey) => {
        let task: Task[] = boards[boardSectionKey].task;
        boards[boardSectionKey].task = task.filter((task: Task) => {
          return task.tag === filters.priority;
        });
      });
    }

    if (filters.assinee !== "all") {
      Object.keys(boards).map((boardSectionKey) => {
        let task: Task[] = boards[boardSectionKey].task;
        boards[boardSectionKey].task = task.filter((task: Task) => {
          let isAssign = task.users?.find((u) => {
            return u.id === filters.assinee;
          });

          if (isAssign) {
            return task;
          }
        });
      });
    }

    if ((filters.sort as Sort) !== "all") {
      Object.keys(boards).map((boardSectionKey) => {
        let task: Task[] = boards[boardSectionKey].task;
        boards[boardSectionKey].task = task.sort((a, b) => {
          const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          let diff: number = 0;
          if ((filters.sort as Sort) === "needToComplete") diff = dateA - dateB;
          if ((filters.sort as Sort) === "upcomming") diff = dateB - dateA;
          return diff;
        });
      });
    }

    if (search) {
      Object.keys(boards).map((boardSectionKey) => {
        let task: Task[] = boards[boardSectionKey].task;
        boards[boardSectionKey].task = task.filter((task: Task) => {
          return task.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        });
      });
    }

    return boards;
  }, [filters, boardSections, search]);

  const deBounce = useRef<number | null>(null);
  const handleSearch = (e: any) => {
    let query: string = e.target.value;
    if (deBounce.current) clearTimeout(deBounce.current);
    deBounce.current = setTimeout(() => {
      setSearch(query);
    }, 400);
  };

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
    return () => {
      updateLocalStorageboard(id, boardSections);
      deBounce.current && clearTimeout(deBounce.current);
    };
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
        <div className="flex gap-2 items-center">
          <div>
            <input
              onChange={handleSearch}
              type="search"
              placeholder="Search task"
              className="border border-gray-300 p-1 rounded outline-0 bg-gray-100"
            />
          </div>
          <select
            onChange={(e) => {
              setFilters((pre) => ({ ...pre, assinee: e.target.value }));
            }}
            className="p-1 rounded outline-0 bg-gray-100 border border-gray-300"
          >
            <option value={"all"}>All Assignee</option>
            {users.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => {
              setFilters((pre) => ({ ...pre, priority: e.target.value }));
            }}
            className="p-1 rounded outline-0 bg-gray-100 border border-gray-300"
          >
            <option value={"all"}>All</option>
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </select>
           <select
            onChange={(e) => {
              setFilters((pre) => ({ ...pre, sort: e.target.value }));
            }}
            className="p-1 rounded outline-0 bg-gray-100 border border-gray-300"
          >
            <option value={"all"}>All Due</option>
            <option value={"needToComplete"}>Need attention</option>
            <option value={"upcomming"}>Up Comming</option>
          </select>
          <button
            className="p-1 px-2 bg-blue-500 text-white rounded flex items-center gap-2 cursor-pointer hover:bg-blue-600"
            onClick={addColumn}
          >
            <FaPlus /> New Column
          </button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-full flex flex-nowrap overflow-x-auto gap-5">
          {Object.keys(filteredBoardSections).map((boardSectionKey) => (
            <BoardSection
              key={boardSectionKey}
              id={boardSectionKey}
              title={filteredBoardSections[boardSectionKey].title}
              tasks={filteredBoardSections[boardSectionKey].task}
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
