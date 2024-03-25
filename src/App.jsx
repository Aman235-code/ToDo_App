import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id == id);
    settodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    savetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    settodos(newTodos);
    savetoLS();
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    savetoLS();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    savetoLS();
  };

  const toggleFinished = (e) => {
    setshowfinished(!showfinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">Manage Todos</h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            name=""
            id=""
            className="w-full rounded-full px-5 py-1"
          />
          <button
            disabled={todo.length == 0}
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-300 p-2 py-1 text-white rounded-md"
          >
            Add
          </button>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showfinished}
          name=""
          id=""
        />{" "}
        Show Finished
        <h2 className="text-lg font-bold my-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-center">No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      name={item.id}
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
