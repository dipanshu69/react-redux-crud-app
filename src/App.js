import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
