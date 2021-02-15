// import Nweet from "components/Nweet";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbInstance";
import React, { useEffect, useState } from "react";
import "style.css";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />

      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
