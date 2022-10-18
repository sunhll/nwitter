import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

// index.jsからcallされる。returでrouterをcall
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        //App.jsでUser情報を扱っているため、userObjを生成。userの情報を利用する;
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    }
    );
  }, []);

  // userObjはApp.jsで最初セットしてrouterを通じて連携しているため、ここでuserObjのrefreshを行う。(currentUser情報へrefresh)
  // refreshUserもrouterに連携
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  return (
    <>
      {init ? <AppRouter propIsLoggedIn={isLoggedIn} propUserObj={userObj} propRefreshUser={refreshUser} /> : "Initializing..."}
    </>
  );
}


export default App;
