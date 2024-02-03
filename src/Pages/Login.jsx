import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    console.log("sbumitted");
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      useState(true);
    }
  };
  const guestSubmit = async (e) => {
    console.log("sbumitted");
    e.preventDefault();
    const email = "ansh123@gmail.com";
    const password = "zxcvbnmp";
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      useState(true);
    }
  };
  const checkPassword = () => {
    var passwordInput = document.getElementById("password").value;
    //  submitdata();

    if (passwordInput.length >= 8) {
      document.getElementById("errorMessage").innerText = "";
    } else {
      document.getElementById("errorMessage").innerText =
        "enter atleast 8 characters";
    }
  };

  return (
    <div className="formcontainer">
      <div className="wrap">
        <div className="logo">CHATGRAM</div>
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email id" required />
          <input
            type="password"
            placeholder="password"
            id="password"
            onKeyUp={checkPassword}
            required
          />
          <span id="errorMessage"></span>

          <button>Sign In</button>
          <button onClick={guestSubmit}>Sign In As Guest</button>
          {err && <span className="error">Oops! something went wrong</span>}
        </form>
        <p>
          not a member? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
