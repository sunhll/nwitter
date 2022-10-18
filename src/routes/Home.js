import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//ログイン後のMAIN画面
const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    //firebaseからdocument全量取得
    //collection = フォルダー
    //document =　ファイル
    useEffect(() => {
        //listenerの役割を行うonSnapshot → firebaseのCRUDが起きたタイミングで動作する。
        dbService.collection("nweets").onSnapshot((snapt) => {
            const nweetArray = snapt.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, [])

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;