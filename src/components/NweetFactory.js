import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

// Home.jsからcallされるNweet画面
const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [fileURL, setFileURL] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let fileDownloadURL = "";

        // imgをアップロードした場合
        if (fileURL !== "") {
            //firebaseのstorage serviceを利用してみる。
            // １．reference生成
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}}`);
            // ２．referenceへの更新(put)
            const response = await fileRef.putString(fileURL, "data_url");
            // ３．更新後、return(response)からDownloadURL取得
            fileDownloadURL = (await response.ref.getDownloadURL());
        }

        // DBに入れるnweet object生成
        const nweetObj = {
            msg: nweet,
            createdAt: Date.now(),
            // userObjはApp.jsから貰っている。
            creatorId: userObj.uid,
            attachmentUrl: fileDownloadURL
        };

        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setFileURL("");
    };

    // 入力テキストに変更があるたびに、そのevent targetからvalueを取得して変数にセット
    // event listener
    const textOnChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };

    // 上記と同様。(ファイル用)
    // event listener
    const onFileChange = (event) => {
        // ReactのHOOKS機能： event.targetからfilesを取得する方法 ※TODO:react hookに関して知識が足りない。。。
        const { target: { files } } = event;
        const theFile = files[0];
        // file reader apiを活用
        const reader = new FileReader();
        // event listener loadが完了したらcallされる
        reader.onloadend = (eventLoadend) => {
            const { currentTarget: { result } } = eventLoadend;
            setFileURL(result);
        };
        // load完了後、read実施
        reader.readAsDataURL(theFile);
    };

    // event listener
    const onClearFileURL = () => {
        //fileURL初期化
        setFileURL(null);
    };

    return (
        <form>
            <input type="text" value={nweet} onChange={textOnChange} placeholder="What's on your mind?" maxLength={100} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet" onClick={onSubmit} />
            {fileURL && (
                <div>
                    <img src={fileURL} width="50px" height="50px" />
                    <button onClick={onClearFileURL}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;