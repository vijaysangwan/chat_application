import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="navbar">
      <div className="logosmall">CHATGRAM</div>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        />
        <span> {currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
