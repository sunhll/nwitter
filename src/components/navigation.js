import React from "react";
import { Link } from "react-router-dom";

//ユーザーが既にログインされた場合、表示されるページ
const Navigation = ({ userObj }) => {

    let name = userObj.displayName;
    if (name === null) {
        name = userObj.email.split('@')[0];
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{name}'s Profile</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;