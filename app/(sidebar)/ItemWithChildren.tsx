"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { NavItem } from "./Sidebar";
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  GripVertical,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import NavItemChild from "./NavItemChild";

const ItemWithChildren = ({
  navItem,
  setOpenedTabs,
  openedTabs,
  edit,
  setNav,
}: {
  navItem: NavItem;
  setOpenedTabs: Dispatch<SetStateAction<number[]>>;
  openedTabs: number[];
  edit: boolean;
  setNav: Dispatch<SetStateAction<NavItem[]>>;
}) => {
  const parentSortable = useSortable({ id: navItem.id });

  const parentStyle = {
    transform: CSS.Transform.toString(parentSortable.transform),
    transition: parentSortable.transition,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [navItemChildren, setNavItemChildren] = useState(navItem.children);

  const handleOpenedTabs = (tab: number) => {
    setOpenedTabs((prevTabs) =>
      prevTabs.includes(tab)
        ? prevTabs.filter((t) => t !== tab)
        : [...prevTabs, tab]
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setNav((prevNav) => {
        return prevNav.map((item) => {
          if (item.id === navItem.id && item.children) {
            const oldIndex = item.children.findIndex(
              (child) => child.id === active.id
            );
            const newIndex = item.children.findIndex(
              (child) => child.id === over.id
            );

            const newChildren = arrayMove(item.children, oldIndex, newIndex);

            return { ...item, children: newChildren };
          }
          return item;
        });
      });

      fetch("https://daftra-api.vercel.app/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: active.id,
          from: active.id,
          to: over.id,
        }),
      });
    }
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
    <>
      <div
        ref={parentSortable.setNodeRef}
        style={parentStyle}
        {...parentSortable.attributes}
        onClick={() => !edit && handleOpenedTabs(navItem.id)}
        key={navItem.id}
        className={cn(
          "bg-[#f7f7f7] w-full p-2 flex justify-between items-center cursor-pointer",
          {
            hidden: navItem.visible === false && !edit,
            "text-gray-300": navItem.visible === false && edit,
          }
        )}
      >
        <span className="flex">
          {edit && (
            <span className="cursor-grab" {...parentSortable.listeners}>
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
        </span>

        {edit ? (
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
        ) : (
          <ChevronDown
            className={cn("transition-all", {
              "rotate-180": openedTabs.includes(navItem.id),
            })}
          />
        )}
      </div>
      {navItemChildren && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={navItemChildren}
            strategy={verticalListSortingStrategy}
          >
            {navItem.children &&
              openedTabs.includes(navItem.id) &&
              navItem.children.map((child) => (
                <NavItemChild
                  key={child.id}
                  child={child}
                  edit={edit}
                  setNav={setNav}
                />
              ))}
          </SortableContext>
        </DndContext>
      )}
    </>
  );
};

export default ItemWithChildren;
