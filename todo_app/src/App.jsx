import "./App.css";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

import HomePage from "./HomePage";
import UserLogin from "./UserLogin";
import RegisterPage from "./register";
import ViewTask from "./ViewTask";

function App() {
    return (
        <BrowserRouter>
        <nav>
        <Link to="/user">User</Link> {" | "}
        <Link to="/register">Register</Link>
      </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserLogin />} />
                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/view/:id" element={<ViewTask />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;