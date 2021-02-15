import { dbService, storageService } from "fbInstance";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete??");
    console.log(ok);
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      if (nweetObj.fileUrl !== "") {
        await storageService.refFromURL(nweetObj.fileUrl).delete();
      }
    }
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEdit(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div className="nweet">
      {edit ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              className="formInput"
            ></input>
            <input type="submit" value="Update" className="formBtn"></input>
          </form>
          <span onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <div>
          <h4>{nweetObj.text}</h4>
          {nweetObj.fileUrl && <img src={nweetObj.fileUrl} alt=""></img>}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nweet;
