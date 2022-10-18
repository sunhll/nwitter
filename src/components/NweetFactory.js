import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

// Home.jsからcallされるNweet画面
const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [fileURL, setFileURL] = useState("");

    const onSubmit = async (event) => {

        if (nweet === "") {
            return;
        }

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
        setFileURL("");
    };

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={textOnChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{ opacity: 0, }} />
            {fileURL && (
                <div className="factoryForm__attachment">
                    <img src={fileURL} style={{ backgroundImage: fileURL, }} />
                    <div className="factoryForm__clear" onClick={onClearFileURL}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;