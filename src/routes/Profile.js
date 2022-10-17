import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Routerから(home.jsのリンクから)遷移されるprofile画面
const Profile = ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    // userObj.uidをキーとしてfirebase dbserviceからnweets情報取得
    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets")
            .where("creatorId", "==", `${userObj.uid}`)
            .orderBy("createdAt")
            .get();

    };

    useEffect(
        () => {
            getMyNweets();
        }, []
    );

    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};

export default Profile;