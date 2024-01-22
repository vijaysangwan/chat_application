import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handlesearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
    
  };

  const handlekey = (e) => {
    e.code === "Enter" && handlesearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch { }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          placeholder="Find someone"
          onKeyDown={handlekey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span id="errorMessage">user not found</span>}
      {user && (
        <div className="userchat" onClick={handleSelect}>
          <img
            src={user.photoURL}
            alt="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
          <div className="userchatinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
