import React, { useState } from "react";
import Adddp from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  // let submit = true;
  // const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
       //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      useState(true);
    }
  }
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
  // const submitdata = () => {
  //   if (
  //     document.getElementById("email").value.length > 0 &&
  //     document.getElementById("password").value.length >= 8
  //   ) {
  //     console.log("if");
  //      setDisabled(false);
  //     submit = false;
  //   }
  // }
  return (
    <div className="formcontainer">
      <div className="wrap">
        <div className="logo">CHATGRAM</div>
        <div className="title">Register</div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="user Name" />
          <input type="email" placeholder="email id" id="email" />
          <input
            type="password"
            placeholder="password"
            id="password"
            onKeyUp={checkPassword}
          />
          <span id="errorMessage"></span>
          <input
            style={{ display: "none" }}
            type="file"
            id="dp"
            placeholder="your DP"
          />
          <label htmlFor="dp">
            <img src={Adddp} alt="" />
            <span>Add your dp</span>
          </label>
          <button>Create New Account</button>
        </form>
        {err && <span className="error">Oops! something went wrong</span>}
        <p>
          already a member? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
