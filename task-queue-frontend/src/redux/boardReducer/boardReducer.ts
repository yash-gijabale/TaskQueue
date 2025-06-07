import { arrayMove } from "@dnd-kit/sortable";
import type { BoardSectionsType, Task } from "../../pages/BoardSectionList";
import type { ActionType } from "../type"
import { ADD_COLUMN, ADD_TASK, EDIT_TASK, GET_COLUMN_LIST, ON_DRAG_END, REARANGE_TASK, REMOVE_COLUMN, REMOVE_TASK, RENAME_COLUMN } from "./type";

export const INITISL_BOARD_COLUMNS: BoardSectionsType = {
    'todo': { title: 'Todo', task: [] },
    'inprocess': { title: 'In Proccess', task: [] },
    'done': { title: 'Done', task: [] }
}

const getInitialBoard = (): BoardSectionsType => {
    let allBoard: any[] = JSON.parse(localStorage.getItem('boardList') as any)
    if (allBoard) {
        let activeBoardId: string = JSON.parse(localStorage.getItem('activeBordId') as any)
        let activeBoard = allBoard.find((board: any) => board.id === activeBoardId)
        return activeBoard ? activeBoard.columns : INITISL_BOARD_COLUMNS
    }
    return INITISL_BOARD_COLUMNS
}
const boardReducer = (state: BoardSectionsType = getInitialBoard(), action: ActionType) => {
    switch (action.type) {
        case GET_COLUMN_LIST:
            let list = getInitialBoard()
            return list

        case ADD_COLUMN: {
            let newColumns = { ...state }
            newColumns[action.payload] = { title: action.payload, task: [] }
            return newColumns
        }

        case REMOVE_COLUMN: {
            let newColumns = { ...state }
            delete newColumns[action.payload]
            return newColumns
        }

        case RENAME_COLUMN: {
            let newColumns = { ...state }
            const { id, newName } = action.payload
            return {
                ...newColumns,
                [id]: {
                    ...newColumns[id],
                    title: newName
                }
            }
        }

        case REARANGE_TASK: {

            let preState = { ...state };
            let { activeContainer, overContainer, active, over } = action.payload;
            const activeItems = preState[activeContainer].task;
            const overItems = preState[overContainer].task;

            const activeIndex = activeItems.findIndex(
                (item: Task) => item.id === active
            );
            const overIndex = overItems.findIndex(
                (item: Task) => item.id === over
            );

            let movingTask = activeItems[activeIndex];
            movingTask = {
                ...movingTask,
                status: overContainer,
            };

            const newActiveItems = activeItems.filter((item: Task) => item.id !== active);

            const newOverItems = [...overItems];
            newOverItems.splice(overIndex, 0, movingTask);

            return {
                ...preState,
                [activeContainer]: {
                    ...preState[activeContainer],
                    task: newActiveItems,
                },
                [overContainer]: {
                    ...preState[overContainer],
                    task: newOverItems,
                },
            };
        }


        case ON_DRAG_END: {
            const { activeContainer, overContainer, active, over } = action.payload;

            const activeTasks = [...state[activeContainer].task];
            const overTasks = [...state[overContainer].task];

            const activeIndex = activeTasks.findIndex(task => task.id === active);
            const overIndex = overTasks.findIndex(task => task.id === over);

            if (activeIndex === -1 || overIndex === -1) return state;

            const movingTask = {
                ...activeTasks[activeIndex],
                status: overContainer,
            };

            // Remove from old list
            if (activeContainer === overContainer) {
                const reorderedTasks = arrayMove(overTasks, activeIndex, overIndex);
                return {
                    ...state,
                    [overContainer]: {
                        ...state[overContainer],
                        task: reorderedTasks
                    }
                };
            } else {
                const newActiveTasks = activeTasks.filter((_, i) => i !== activeIndex);
                const newOverTasks = [
                    ...overTasks.slice(0, overIndex),
                    movingTask,
                    ...overTasks.slice(overIndex)
                ];

                return {
                    ...state,
                    [activeContainer]: {
                        ...state[activeContainer],
                        task: newActiveTasks
                    },
                    [overContainer]: {
                        ...state[overContainer],
                        task: newOverTasks
                    }
                };
            }
        }



        case ADD_TASK: {
            let { status } = action.payload
            let preState = { ...state }
            return {
                ...preState,
                [status]: { ...preState[status], task: [...preState[status].task, action.payload] }
            }
        }

        case EDIT_TASK: {
            const { id, status } = action.payload;
            const preState = { ...state };

            const newTaskList = preState[status].task.map((task: Task) =>
                task.id === id
                    ? action.payload
                    : task
            );
            return {
                ...preState,
                [status]: {
                    ...preState[status],
                    task: newTaskList,
                },
            };
        }


        case REMOVE_TASK: {
            let { status, id } = action.payload
            let preState = { ...state }
            let filtedTask = preState[status].task.filter((task: Task) => task.id !== id)
            return {
                ...preState,
                [status]: {
                    ...preState[status],
                    task: filtedTask
                }
            }
        }

        default: return state
    }
}

export default boardReducer