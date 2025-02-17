import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";
import { useSortable } from "@dnd-kit/sortable";
import { data } from "./data.jsx";

function App() {
  const [list, setLanguages] = useState([0, 0, 1, 2, 3, 0]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container className='p-3' style={{ width: "50%" }} align='center'>
        <h3>The best programming languages!</h3>
        <SortableContext
          className='container'
          items={list.map((i) => data[i].name)}
          strategy={rectSwappingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {list.map((i) => {
            return i > 0 ? (
              <SortableItem key={i} id={i} name={data[i].name} />
            ) : (
              <div>
                <div className='m-3 card empty'>{data[i].name}</div>
              </div>
            );
          })}
        </SortableContext>
      </Container>
    </DndContext>
  );

  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1]
      });
    }
  }
}

export default App;
