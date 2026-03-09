import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewStudent() {

  const { id } = useParams();

  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);

  // Fetch submitted data
  useEffect(() => {

    axios
      .get("http://localhost:5000/student/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));

  }, [id]);



  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };


  const update = async () => {

    await axios.put("http://localhost:5000/student/" + id, data);

    alert("Data Updated Successfully");

    setEdit(false);

  };


  const del = async () => {

    await axios.delete("http://localhost:5000/student/" + id);

    alert("Data Deleted");

  };



  return (
    <div className="container">

      <h2>Form Submitted Successfully</h2>

      <input value={data.fullname || ""} disabled />
      <input value={data.email || ""} disabled />
      <input value={data.phone || ""} disabled />

      <input
        name="course"
        value={data.course || ""}
        onChange={handleChange}
        disabled={!edit}
      />

      <input
        name="stream"
        value={data.stream || ""}
        onChange={handleChange}
        disabled={!edit}
      />

      <input
        name="location"
        value={data.location || ""}
        onChange={handleChange}
        disabled={!edit}
      />

      {!edit ? (
        <button className="edit-btn" onClick={() => setEdit(true)}>
          Edit
        </button>
      ) : (
        <button className="submit-btn" onClick={update}>
          Save
        </button>
      )}

      <button className="delete-btn" onClick={del}>
        Delete
      </button>

    </div>
  );
}

export default ViewStudent;