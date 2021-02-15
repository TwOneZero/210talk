import { authService, dbService } from "fbInstance";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [value, setValue] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((docs) => docs.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== value) {
      await userObj
        .updateProfile({ displayName: value })
        .then(console.log("Done!"));
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={value}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        ></input>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
