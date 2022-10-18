import React from "react";
import AuthFrom from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";

//ログイン情報がない場合、アカウント登録・ログインを行う画面
//firebaseで提供するgoogle githubでのログインも可能
const Auth = () => {

    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <AuthFrom />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
};


export default Auth;