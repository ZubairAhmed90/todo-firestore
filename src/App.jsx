// TodoApp.js
import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // import the Firestore db

const App = () => {
  // const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const todoVal = useRef();

  // Fetch todos from Firestore on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosList);
    };
    fetchTodos();
  }, []);

  // Add a new task to Firestore
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    // const newTask = {
    //   task,
    //   completed: false,
    // };
  

    try {
//       // Add a new document with a generated id.
// const docRef = await addDoc(collection(db, "cities"), {
//   name: "Tokyo",
//   country: "Japan"
// });
console.log("Document written with ID: ", docRef.id);
      const docRef = await addDoc(collection(db, "todos"), todoVal.current.value);
      setTodos([...todos, { ...newTask, id: docRef.id }]); // Update the state
      // setTask("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Delete a task from Firestore
  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id)); // Update the state after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          // value={task}
          ref={todoVal}
          placeholder="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: "10px" }}>
            {todo.task}{" "}
            <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
