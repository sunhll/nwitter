import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

//Home.jsのNweet表示でcallされる。
const Nweet = ({ nweetObj, isOwner }) => {

    const [doingEditFlag, setDoingEditFlag] = useState(false);
    const [editMsg, setEditMsg] = useState(nweetObj.msg);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            //firebase doc referanceを利用してdocument IDにマッピングするdocument削除
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //firebase storage serviceのrefFromURLのパラメータでファイルURLを送ってref取得が可能。
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };

    //clickしたらステータスを逆転する。
    const toggleEditing = () => setDoingEditFlag((a) => !a);

    //preventDefault→デフォルトの操作を防ぐ＝submitをしても以後の処理は僕が決める。
    //formからの情報を基にupdate実施
    const onSubmitForUpdate = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update(
            {
                msg: editMsg
            }
        );
        setDoingEditFlag(false);
    };

    //edit textにonchageを入力してsetEditMsgを最新にsetする
    const onChanged = (event) => {
        const { target: { value } } = event;
        setEditMsg(value);
    };

    return (
        <div className="nweet">
            {
                doingEditFlag ? (
                    <>
                        <form onSubmit={onSubmitForUpdate} className="container nweetEdit">
                            <input type="text" placeholder="Edit your nweet" value={editMsg} onChange={onChanged} autoFocus required className="formInput" />
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.msg}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                        {isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    )
}

export default Nweet;