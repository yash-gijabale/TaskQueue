import type { BoardSectionsType } from '../pages/BoardSectionList';


export const findBoardSectionContainer = (
    boardSections: BoardSectionsType,
    id: string
) => {
    if (id in boardSections) {
        return id;
    }
    //console.log(boardSections, id)
    const container: any = Object.keys(boardSections).find((key) =>
        boardSections[key].find((item) => item.id === id)
    );
    return container;
};
