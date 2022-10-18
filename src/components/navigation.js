import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//ユーザーが既にログインされた場合、表示されるページ
const Navigation = ({ userObj }) => {
    let name

    //臨時対応
    try {
        name = userObj.displayName;
    } catch (error) {
        name = null;
    }
    
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <li>
                    <Link to="/" style={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style={{ marginTop: 10 }}>
                            {name
                                ? `${name}'s Profile`
                                : "Profile"}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navigation;