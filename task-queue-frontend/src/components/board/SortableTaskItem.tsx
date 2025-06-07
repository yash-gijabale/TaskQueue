import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { useSelector } from "react-redux";
// import type { Auth } from "../../redux/authReducer/authReducer";

type SortableTaskItemProps = {
  children: React.ReactNode;
  id: string;
  assigneeUser?: any;
};

// const checkForMyTask = (userId: string, assigneeUsers: Array<any>): boolean => {
//   let isAssignTome = assigneeUsers.filter((user) => user.id === userId);
//   return isAssignTome.length ? true : false;
// };

const SortableTaskItem = ({
  children,
  id,
}: SortableTaskItemProps) => {
  // const auth: Auth = useSelector((state: any) => state.authReducer);
  // let isAssignTome: boolean;
  // if (auth.user && auth.user?.type !== "admin") {
  //   isAssignTome = assigneeUser
  //     ? checkForMyTask(auth.user?.id, assigneeUser)
  //     : false;
  // } else {
  //   isAssignTome = true;
  // }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableTaskItem;
