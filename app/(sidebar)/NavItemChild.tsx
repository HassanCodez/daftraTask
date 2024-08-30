import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { NavItem } from "./Sidebar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff, GripVertical, Pencil } from "lucide-react";

const NavItemChild = ({
  child,
  edit,
  setNav,
}: {
  child: NavItem;
  edit: boolean;
  setNav: Dispatch<SetStateAction<NavItem[]>>;
}) => {
  const childSortable = useSortable({ id: child.id });

  const childStyle = {
    transform: CSS.Transform.toString(childSortable.transform),
    transition: childSortable.transition,
  };

  const [editTitle, setEditTitle] = useState(false);

  const updateNavItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setNav((prevNav) =>
      prevNav.map((item) => {
        if (item.children) {
          return {
            ...item,
            children: item.children.map((c) =>
              c.id === child.id ? { ...c, title: newTitle } : c
            ),
          };
        }
        return item;
      })
    );
  };
  const updateNavItemVisibility = () => {
    setNav((prevNav) =>
      prevNav.map((item) => {
        if (item.children) {
          return {
            ...item,
            children: item.children.map((c) =>
              c.id === child.id ? { ...c, visible: !c.visible } : c
            ),
          };
        }
        return item;
      })
    );
  };

  return (
    <div
      ref={childSortable.setNodeRef}
      style={childStyle}
      {...childSortable.attributes}
      className={cn("bg-[#f7f7f7] p-2 ml-4 cursor-pointer flex items-center", {
        hidden: child.visible === false && !edit,
        "text-gray-300": child.visible === false && edit,
      })}
    >
      {edit && (
        <span className="cursor-grab" {...childSortable.listeners}>
          <GripVertical />
        </span>
      )}
      {editTitle ? (
        <input
          className="w-full p-1 outline-none border"
          type="text"
          defaultValue={child.title}
          onChange={updateNavItemTitle}
        />
      ) : (
        child.title
      )}
      {edit && (
        <span className="flex items-center gap-4 ml-auto text-gray-500">
          {editTitle ? (
            <Check color="green" onClick={() => setEditTitle(false)} />
          ) : (
            <Pencil
              size={15}
              className="cursor-pointer"
              onClick={() => setEditTitle(true)}
            />
          )}
          {child.visible === false ? (
            <Eye
              size={15}
              className="cursor-pointer"
              onClick={updateNavItemVisibility}
            />
          ) : (
            <EyeOff
              size={15}
              className="cursor-pointer"
              onClick={updateNavItemVisibility}
            />
          )}
        </span>
      )}
    </div>
  );
};

export default NavItemChild;
