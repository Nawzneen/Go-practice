// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
  Stack,
  Container,
  // TodoList,
} from "@chakra-ui/react";
// export const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  );
}

export default App;
