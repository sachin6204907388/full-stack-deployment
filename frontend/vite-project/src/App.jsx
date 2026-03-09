import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterLogin from "./pages/RegisterLogin";
import StudentForm from "./pages/StudentForm";
import ViewStudent from "./pages/ViewStudent";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/form/:id" element={<StudentForm />} />
        <Route path="/view/:id" element={<ViewStudent />} />
      </Routes>
    </Router>
  );
}

export default App;