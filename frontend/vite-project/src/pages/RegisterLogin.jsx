import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterLogin() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: ""
  });


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };


  /* REGISTER FUNCTION */

  const register = async () => {

    const res = await axios.post("http://localhost:5000/register", data);

    alert(res.data.message);

    navigate("/form/" + res.data.userId);

  };


  /* LOGIN FUNCTION */

  const login = async () => {

    const res = await axios.post("http://localhost:5000/login", {
      email: data.email,
      password: data.password
    });

    if (res.data.id) {

      navigate("/view/" + res.data.id);

    } else {

      alert("Invalid email or password");

    }

  };


  return (
    <div className="container">

      {!isLogin ? <h2>Register</h2> : <h2>Login</h2>}

      {/* REGISTER FIELDS */}

      {!isLogin && (
        <>
          <input
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
        </>
      )}

      {/* COMMON FIELDS */}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />


      {/* BUTTONS */}

      {!isLogin ? (

        <>
          <button className="register-btn" onClick={register}>
            Register
          </button>

          <p>
            Already Registered?
          </p>

          <button
            className="login-btn"
            onClick={() => setIsLogin(true)}
          >
            Go to Login
          </button>
        </>

      ) : (

        <>
          <button className="login-btn" onClick={login}>
            Login
          </button>

          <p>
            New User?
          </p>

          <button
            className="register-btn"
            onClick={() => setIsLogin(false)}
          >
            Go to Register
          </button>
        </>

      )}

    </div>
  );
}

export default RegisterLogin;