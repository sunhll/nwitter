import React from "react";
import AuthFrom from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub, } from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ marginBottom: 30 }} />
            <AuthFrom />
            <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">Continue with Google<FontAwesomeIcon icon={faGoogle} /></button>
                <button name="github" onClick={onSocialClick} className="authBtn">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    );
};


export default Auth;