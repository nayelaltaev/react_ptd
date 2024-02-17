import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";
import "./App.css";
//
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  //
  const handleEdit = () => {
    setEditing(true);
  };
  //
  const updating = (updatedTitle, id) => {
    setAllTodos(
      allTodos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewDescription("");
    setNewTitle("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + "   " + h + ":" + m + ":" + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };
  //
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    //
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);
  //
  return (
    <div className="App">
      <h1>Планировщик задач</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Название задачи"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Описание задачи"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Добавить
            </button>
          </div>
        </div>
        {/*  */}
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        {/* нижняя часть блока*/}
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    {editing ? (
                      <>
                        <h3>
                          <input
                            onChange={(e) => updating(e.target.value, item.id)}
                            value={item.title}
                          />
                        </h3>
                        <p>
                          <input
                            // onChange={(e) => updating(e.target.value, item.id)}
                            value={item.description}
                          />
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </>
                    )}
                  </div>

                  <div>
                    {editing ? (
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => setEditing(false)}
                      />
                    ) : (
                      <MdDriveFileRenameOutline
                        className="change-icon"
                        onClick={() => handleEdit(item.id)}
                      />
                    )}
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}
          {/*  */}
          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small> Completed on {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
