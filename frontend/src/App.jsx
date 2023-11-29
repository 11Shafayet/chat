import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact Component={HomePage} />
      <Route path="/chat" Component={ChatPage} />
    </Routes>
  );
}

export default App;
