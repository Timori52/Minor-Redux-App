import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, removeTodo } from "../todoSlice";

const AddingTodos = () => {
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  function addTodoHandler(e) {
    e.preventDefault();
    if (isEdit) {
      dispatch(editTodo({
        id: editId,
        newText: input
      }));
      setIsEdit(false);
      setEditId(null);
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  }

  function handleEdit(todo) {
    setIsEdit(true);
    setEditId(todo.id);
    setInput(todo.text);
  }
  return (
    <>
    <div>Todos</div>
      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          placeholder="enter todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-red-600"
        />

        <button
          type="submit"
          disabled={input.trim().length===0}
        >
          {isEdit ?  "Update Todo" :"Add Todo"}
        </button>
      </form>

      {/*Todo component*/}
      <ul>
      <p>Below are your Todos: </p>
      {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button type="button" className="border-none text-green-500" onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
            <button type="button" onClick={() => handleEdit(todo)}>
              Edit Todo
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddingTodos;