import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {

    const [doingEditFlag, setDoingEditFlag] = useState(false);
    const [editMsg, setEditMsg] = useState(nweetObj.msg);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            //firebase doc referanceを利用してdocument IDにマッピングするdocument削除
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };

    //clickしたらステータスを逆転する。
    const toggleEditting = () => setDoingEditFlag((a) => !a);

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
        <div>
            {
                doingEditFlag ? (
                    <>
                        <form onSubmit={onSubmitForUpdate}>
                            <input type="text" placeholder="Edit your nweet" value={editMsg} onChange={onChanged} />
                            <input type="submit" value="Update Nweet" />
                        </form>
                        <button onClick={toggleEditting}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.msg}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditting}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    )
}

export default Nweet;