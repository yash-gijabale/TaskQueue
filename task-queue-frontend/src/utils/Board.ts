import type { BoardSectionsType } from '../pages/BoardSectionList';


export const findBoardSectionContainer = (
    boardSections: BoardSectionsType,
    id: string
) => {
    if (id in boardSections) {
        return id;
    }
    const container: any = Object.keys(boardSections).find((key) =>
        boardSections[key].task.find((item) => item.id === id)
    );
    return container;
};

export const checkForReuiredFiled = (filed: Array<string>, data: any) => {
    let checkMap = filed.map((key) => {
        return data[key] ? true : false;
    });

    return checkMap.every((key) => key === true);
};