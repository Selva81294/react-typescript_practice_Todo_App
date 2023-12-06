import React, { useState } from "react";
import { todosType } from "./todosType";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<todosType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<todosType[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), isDone: false, todo }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add, active = todos, complete = completedTodos;

    if(source.droppableId === "activeList"){
        add = active[source.index];
        active.splice(source.index,1)
    } else {
        add = complete[source.index];
        complete.splice(source.index,1)
    }

    if(destination.droppableId === "activeList"){
        active.splice(destination.index,0,add)
    } else {
        complete.splice(destination.index,0,add)
    }
    setCompletedTodos(complete);
    setTodos(active)

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo">
        <form className="todo_field" onSubmit={(e) => handleSubmit(e)}>
          <input value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button type="submit">submit</button>
        </form>
        <Droppable droppableId="activeList">
          {(provided,snapshot) => (
            <div
              className={`active ${snapshot.isDraggingOver ? "dragActive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p>Active task</p>
              {todos.map((todoVal, index) => (
                <SingleTodo
                  index={index}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                  key={todoVal.id}
                  todo={todoVal}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="removeList">
          {(provided,snapshot) => (
            <div
              className={`completed ${snapshot.isDraggingOver ? "dragRemove" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p>Completed task</p>
              {completedTodos.map((todoVal, index) => (
                <SingleTodo
                  index={index}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                  key={todoVal.id}
                  todo={todoVal}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Todo;
