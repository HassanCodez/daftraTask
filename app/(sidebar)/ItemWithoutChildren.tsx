"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { NavItem } from "./Sidebar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, Eye, EyeOff, GripVertical, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const ItemWithoutChildren = ({
  navItem,
  edit,
  setNav,
}: {
  navItem: NavItem;
  edit: boolean;
  setNav: Dispatch<SetStateAction<NavItem[]>>;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: navItem.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [editTitle, setEditTitle] = useState(false);

  const updateNavItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNav((prevNav) =>
      prevNav.map((item) =>
        item.id === navItem.id ? { ...item, title: e.target.value } : item
      )
    );
  };
  const updateNavItemVisibility = () => {
    if (navItem.visible !== false) {
      setNav((prevNav) =>
        prevNav.map((item) =>
          item.id === navItem.id ? { ...item, visible: false } : item
        )
      );
    } else {
      setNav((prevNav) =>
        prevNav.map((item) =>
          item.id === navItem.id ? { ...item, visible: true } : item
        )
      );
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      key={navItem.id}
      className={cn(
        "bg-[#f7f7f7] w-full p-2 cursor-pointer flex items-center gap-2",
        {
          hidden: navItem.visible === false && !edit,
          "text-gray-300": navItem.visible === false && edit,
        }
      )}
    >
      {edit && (
        <span className="cursor-grab" {...listeners}>
          <GripVertical />
        </span>
      )}
      {editTitle ? (
        <input
          className="w-full p-1 outline-none border"
          type="text"
          defaultValue={navItem.title}
          onChange={updateNavItemTitle}
        />
      ) : (
        navItem.title
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
          {navItem.visible === false ? (
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

export default ItemWithoutChildren;
