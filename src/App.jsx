import React, { useEffect, useRef, useState } from "react";
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import {app,db} from "./firebaseConfig"
import "./App.css";

function App() {
  const todoVal = useRef();
  const db = getFirestore(app);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    async function getTodos() { 
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        console.log("Fetched todos:", querySnapshot.docs.map(doc => doc.data()));
        const todosList = [];
        querySnapshot.forEach((doc) => {
          todosList.push({ todo: doc.data().todo, id: doc.id });
        });
        setTodo(todosList);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getTodos();
  }, [db]);

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = todoVal.current.value;
    try {
      const docRef = await addDoc(collection(db, "todos"), { todo: newTodo });
      console.log("Added todo:", { todo: newTodo, id: docRef.id });
      setTodo((prevTodos) => [{ todo: newTodo, id: docRef.id }, ...prevTodos]);
      todoVal.current.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  async function editTodo(index, id) {
    const editedTodo = prompt("Enter edit todo");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      try {
        const updatedTodos = [...todo];
        updatedTodos[index].todo = editedTodo;
        setTodo(updatedTodos);
        const edit = doc(db, "todos", id);
        await updateDoc(edit, { todo: editedTodo });
        console.log("Updated todo:", { todo: editedTodo, id });
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    }
  }

  async function deleteTodo(index, id) {
    try {
      const newTodoList = todo.filter((_, i) => i !== index);
      setTodo(newTodoList);
      await deleteDoc(doc(db, "todos", id));
      console.log("Deleted todo:", id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input type="text" ref={todoVal} placeholder="Enter a todo..." />
        <button type="submit">Add Todo</button>
      </form>
      {todo.length > 0 ? (
        todo.map((item, index) => (
          <div className="todo-item" key={item.id}>
            <h2>{item.todo}</h2>
            <div>
              <button className="edit" onClick={() => editTodo(index, item.id)}>Edit</button>
              <button onClick={() => deleteTodo(index, item.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-message">No todos yet.</p>
      )}
    </div>
  );
}

export default App;
