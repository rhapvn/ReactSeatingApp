import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { data } from "../data/data.jsx";
import { useEffect, useState } from "react";

export function SortableItem({ index, id }) {
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [moveData, setMoveData] = useState({ place: "", id: "", x: 0, y: 0 });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index,
      transition: {
        duration: 150,
        easing: "cubic - bezier(0.25, 0.1, 0.25, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStartDesk = (e, a) => {
    e.preventDefault();
    setInitial({ x: e.clientX, y: e.clientY });
    setMoveData({
      place: e.currentTarget.parentElement.parentElement.className,
      id: e.currentTarget.getAttribute("index"),
      x: 0,
      y: 0,
    });
    console.log("start");
    console.log(e);
    console.log(a);

    console.log(e.clientX, e.clientY);
    console.log(
      e.currentTarget.parentElement.parentElement.className,
      e.currentTarget.getAttribute("index"),
      initial.x,
      initial.y
    );
    setIsDragging(true);
  };

  const handleMouseMoveDesk = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setMoveData((prev) => ({
      place: prev.place,
      id: prev.id,
      x: e.clientX - initial.x,
      y: e.clientY - initial.y,
    }));
    console.log("dragging");
    console.log(
      "place",
      moveData.place,
      "id",
      moveData.id,
      e.clientX - initial.x,
      e.clientY - initial.y
    );
  };

  const handleEndDesk = () => {
    console.log("end");
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveDesk);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveDesk);
    };
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener("mouseup", handleEndDesk);

    return () => {
      window.removeEventListener("mouseup", handleEndDesk);
    };
  }, []);

  return (
    <div
      onDragStart={(e) => handleStartDesk(e, "test")}
      onDragEnd={handleEndDesk}
      className='desk'
      style={style}
      id={"id" + index}
      draggable='true'
    >
      <div className='m3'>{data[parseInt(index)].name}</div>
    </div>
  );
}
