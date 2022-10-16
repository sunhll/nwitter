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
        //App.jsでUser情報を扱っているため、userObjを生成。userの情報を利用する
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    }
    );
  }, []);

  return (
    <>
      {init ? <AppRouter propIsLoggedIn={isLoggedIn} propUserObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}


export default App;
