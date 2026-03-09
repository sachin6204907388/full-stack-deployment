import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function StudentForm() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    course: "",
    stream: "",
    dob: "",
    location: ""
  });

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {

    await axios.post("https://full-stack-deployment-r0fg.onrender.com/student", {
      user_id: id,
      ...data
    });

    alert("Form Submitted Successfully");

    navigate("/view/" + id);

  };

  return (
  <div className="container">

    <h2>Student Registration</h2>

    <input name="course" placeholder="Course" onChange={handleChange}/>
    <input name="stream" placeholder="Stream" onChange={handleChange}/>
    <input type="date" name="dob" onChange={handleChange}/>
    <input name="location" placeholder="Location" onChange={handleChange}/>

    <button className="submit-btn" onClick={submit}>Submit</button>

  </div>
);
}

export default StudentForm;