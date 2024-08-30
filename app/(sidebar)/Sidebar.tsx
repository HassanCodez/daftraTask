"use client";

import { Settings } from "lucide-react";
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
import React, { useEffect, useState } from "react";
import ItemWithoutChildren from "./ItemWithoutChildren";
import ItemWithChildren from "./ItemWithChildren";

export type NavItem = {
  id: number;
  title: string;
  target?: string;
  visible?: boolean;
  children?: NavItem[];
};

const Sidebar = () => {
  const [nav, setNav] = useState<NavItem[]>([]);
  const [openedTabs, setOpenedTabs] = useState<number[]>([]);
  const [edit, setEdit] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function fetchNav() {
    let res = await fetch("http://localhost:8081/nav");
    let data = await res.json();
    setNav(data);
  }
  useEffect(() => {
    fetchNav();
  }, []);

  if (!nav) return <div>Loading...</div>;
  function handleDragEnd(event: DragEndEvent) {
    console.log("🚀 ~ handleDragEnd ~ event:", event);
    const { active, over } = event;
    if (active && over) {
      fetch("http://localhost:8081/track", {
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
      if (active.id !== over.id) {
        setNav((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

  const updateNav = () => {
    fetch("http://localhost:8081/nav", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nav),
    });
    setEdit(false);
    setOpenedTabs([]);
  };
  const cancelEdit = () => {
    fetchNav();
    setEdit(false);
    setOpenedTabs([]);
  };
  return (
    <>
      <Settings
        className="m-2 ml-auto cursor-pointer"
        onClick={() => {
          setEdit(true);
          setOpenedTabs(nav.map((navItem) => navItem.id));
        }}
      />
      <div className="w-full bg-white min-h-[70vh] flex flex-col gap-2  p-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={nav} strategy={verticalListSortingStrategy}>
            {nav.map((navItem) =>
              !navItem.children ? (
                <ItemWithoutChildren
                  edit={edit}
                  key={navItem.id}
                  navItem={navItem}
                  setNav={setNav}
                />
              ) : (
                <ItemWithChildren
                  edit={edit}
                  navItem={navItem}
                  openedTabs={openedTabs}
                  setOpenedTabs={setOpenedTabs}
                  key={navItem.id}
                  setNav={setNav}
                />
              )
            )}
          </SortableContext>
        </DndContext>
        {edit && (
          <div className="flex justify-between items-center mt-auto p-5">
            <button onClick={updateNav}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
