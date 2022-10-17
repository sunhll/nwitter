// Import the functions you need from the SDKs you need
// firebaseが提供してくれる機能の中、auth, firestore, storageを利用する
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// firebaseを利用するため、定義するconfigデータ（普通はenvファイルとして管理するべき）
const firebaseConfig = {
    apiKey: "AIzaSyDASyS3gdEwuQEmE31QpYMzGaKjsNv9dM8",
    authDomain: "nwitter-c72c9.firebaseapp.com",
    projectId: "nwitter-c72c9",
    storageBucket: "nwitter-c72c9.appspot.com",
    messagingSenderId: "445847607325",
    appId: "1:445847607325:web:61b956a22a13e256ac4ef4"
};

// Initialize Firebase
// configデータを基にfirebase初期化(接続)
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();