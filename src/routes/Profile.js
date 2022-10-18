import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Routerから(home.jsのリンクから)遷移されるprofile画面
const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayname, setNewDisplayname] = useState("");

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayname(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        // 臨時対応local loginの場合、displaynameがないため、メールアドレス'＠'の前方を取得して設定
        let name = userObj.displayName;
        if (name === null) {
            name = userObj.email.split('@')[0];
        }

        if (name !== newDisplayname) {
            await userObj.updateProfile({
                displayName: newDisplayname
            });
            // user情報のrefresh
            refreshUser();
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayname} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};

export default Profile;