import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div style={{ width: 400, margin: "80px auto" }}>
      <h1>Create Account</h1>

      <input
        placeholder="Username"
        onChange={(e)=>setForm({...form,username:e.target.value})}
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      <br /><br />

      <button onClick={register}>
        Register
      </button>

      <br /><br />

      <Link to="/login">
        Already have an account?
      </Link>
    </div>
  );
}

export default Register;