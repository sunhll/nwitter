import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//ログイン後のMAIN画面
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
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

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add(
            {
                msg: nweet,
                createdAt: Date.now(),
                //userObjはApp.jsから貰っている。
                creatorId: userObj.uid
            }
        )
        setNweet("");
    };

    const textOnChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };

    return (
        <div>
            <form>
                <input type="text" value={nweet} onChange={textOnChange} placeholder="What's on your mind?" maxLength={100} />
                <input type="submit" value="Nweet" onClick={onSubmit} />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;