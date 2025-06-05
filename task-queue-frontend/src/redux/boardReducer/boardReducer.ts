import { arrayMove } from "@dnd-kit/sortable";
import type { BoardSectionsType, Task } from "../../pages/BoardSectionList";
import type { ActionType } from "../type"
import { ADD_COLUMN, ADD_TASK, EDIT_TASK, GET_BOARD_LIST, ON_DRAG_END, REARANGE_TASK, REMOVE_COLUMN, REMOVE_TASK, RENAME_COLUMN } from "./type";


const INITISL_BOARD_COLUMNS: BoardSectionsType = {
    'todo': [],
    'inprocess': [],
    'done': []
}
const boardReducer = (state: BoardSectionsType = INITISL_BOARD_COLUMNS, action: ActionType) => {
    switch (action.type) {
        case GET_BOARD_LIST:
            return state

        case ADD_COLUMN: {
            let newColumns = { ...state }
            newColumns[action.payload] = []
            return newColumns
        }

        case REMOVE_COLUMN: {
            let newColumns = { ...state }
            delete newColumns[action.payload]
            return newColumns
        }

        case RENAME_COLUMN: {
            let newColumns = { ...state }
            const newBoard: { [key: string]: any[] } = {};
            const {newName, oldName} = action.payload
            for (const key of Object.keys(state)) {
                if (key === oldName) {
                    newColumns[newName] = state[key];
                } else {
                    newColumns[key] = state[key];
                }
            }
            console.log(newName, oldName)
            return newColumns
        }

        case REARANGE_TASK: {
            let preState = { ...state }
            console.log(preState)
            console.log(action.payload)
            let { activeContainer, overContainer, active, over } = action.payload
            const activeItems = preState[activeContainer];
            const overItems = preState[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.findIndex(
                (item: Task) => item.id === active
            );
            const overIndex = overItems.findIndex((item: Task) => item.id !== over);

            return {
                ...preState,
                [activeContainer]: [
                    ...preState[activeContainer].filter(
                        (item: Task) => item.id !== active
                    ),
                ],
                [overContainer]: [
                    ...preState[overContainer].slice(0, overIndex),
                    state[activeContainer][activeIndex],
                    ...preState[overContainer].slice(
                        overIndex,
                        preState[overContainer].length
                    ),
                ],
            };
        }

        case ON_DRAG_END: {
            let preState = { ...state }
            let { activeContainer, overContainer, active, over } = action.payload
            const activeIndex = preState[activeContainer].findIndex(
                (task: any) => task.id === active
            );
            const overIndex = preState[overContainer].findIndex(
                (task: any) => task.id === over
            );
            let newList: Task[] = preState[activeContainer].map((task) => {
                if (task.id === active) {
                    return {
                        ...task,
                        status: overContainer
                    };
                }
                return task;
            });
            preState[overContainer] = newList;
            return {
                ...state,
                [overContainer]: arrayMove(
                    preState[overContainer],
                    activeIndex,
                    overIndex
                ),
            };
        }

        case ADD_TASK: {
            let { status } = action.payload
            let preState = { ...state }
            return {
                ...preState,
                [status]: [...preState[status], action.payload]
            }
        }

        case EDIT_TASK: {
            let { status, id } = action.payload
            let preState = { ...state }
            preState[status] = preState[status].map((task: Task) => {
                if (task.id === id) {
                    console.log(task)
                    return {
                        ...action.payload
                    }
                }
                return task
            })
            return {
                ...preState,
            }
        }

        case REMOVE_TASK: {
            let { status, id } = action.payload
            let preState = { ...state }
            preState[status] = preState[status].filter((task: Task) => task.id !== id)
            return preState
        }

        default: return state
    }
}

export default boardReducer