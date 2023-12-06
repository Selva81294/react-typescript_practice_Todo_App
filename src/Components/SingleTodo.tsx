import React, { useEffect, useState } from "react";
import { todosType } from "./todosType";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type singleTodoType = {
  todo: todosType;
  todos: todosType[];
  setTodos: React.Dispatch<React.SetStateAction<todosType[]>>;
  completedTodos: todosType[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<todosType[]>>;
  index: number;
};

const SingleTodo = ({ todo, todos, setTodos, index }: singleTodoType) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((val) =>
        val.id === id ? { ...val, isDone: !val.isDone } : val
      )
    );
  };

  const handleDelete = (id: number) => {
    let filteredArr = todos.filter((val) => val.id !== id);
    setTodos(filteredArr);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((val) => (val.id === id ? { ...val, todo: editTodo } : val))
    );
    setEdit(!edit);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided,snapshot) => (
        <div
          className={`all_todos ${snapshot.isDragging ? "todoDrag" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <form
            className="single_todos"
            onSubmit={(e) => handleEdit(e, todo.id)}
          >
            {edit ? (
              <input
                className="input"
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
            ) : todo.isDone ? (
              <s>{todo.todo}</s>
            ) : (
              <span>{todo.todo}</span>
            )}
            <span className="todos_icons">
              <CiEdit
                onClick={() => setEdit(true)}
                style={{ marginRight: "10px" }}
              />
              <MdDeleteForever
                onClick={() => handleDelete(todo.id)}
                style={{ marginRight: "10px" }}
              />
              <MdDoneOutline
                onClick={() => handleDone(todo.id)}
                style={{ marginRight: "10px" }}
              />
            </span>
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
