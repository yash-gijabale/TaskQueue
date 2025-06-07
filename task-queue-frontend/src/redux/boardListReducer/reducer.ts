import type { Board } from "../../components/board/BoardList";
import { INITISL_BOARD_COLUMNS } from "../boardReducer/boardReducer";
import { GET_BOARD_LIST } from "../boardReducer/type";
import type { ActionType } from "../type";
import { ADD_BOARD, EDIT_BOARD, REMOVE_BOARD } from "./type";

let oldData: any = localStorage.getItem('boardList')

const INITIAL_BOARD_LIST: Board[] = localStorage.getItem('boardList') ? JSON.parse(oldData) : []
const reducer = (state: Board[] = INITIAL_BOARD_LIST, action: ActionType) => {

    switch (action.type) {
        case ADD_BOARD: {
            let preBoards = [...state]
            let newBoard = {
                ...action.payload,
                columns: INITISL_BOARD_COLUMNS
            }

            return [...preBoards, newBoard]
        }

        case GET_BOARD_LIST: {
            return localStorage.getItem('boardList') ? JSON.parse(oldData) : []
        }

        case EDIT_BOARD: {
            let { id, data } = action.payload
            let preBoard: Board[] = [...state]
            preBoard = preBoard.map((board: Board) => {
                if (board.id === id) {
                    return {
                        ...board,
                        description: data.boardDesc,
                        name: data.boardName
                    }
                }
                return board
            })

            return preBoard
        }

        case REMOVE_BOARD: {
            let id = action.payload
            let preBoard: Board[] = [...state]
            preBoard = preBoard.filter((board: Board) => board.id !== id)

            return preBoard
        }
        default:
            return localStorage.getItem('boardList') ? JSON.parse(oldData) : [];
    }
}


export default reducer