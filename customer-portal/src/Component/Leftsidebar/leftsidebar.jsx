import React from "react";
import "./leftsidebar.css";
import "../Helpher/helpher.css";
import "../Helpher/common.css";
import { Link } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
function LeftSideBar() {

    return (
        <div className="left-navigate w-100">
            <div className="p-20">

            </div>
            <div className="p-20">
                <div className={window.location.pathname == "/" ? "active-link cursor-pointer" : "cursor-pointer"}>
                    <Link to={"/"} className="link-button d-flex align-items-center">
                        <div className="mr-10 d-flex"><ListAltIcon /></div>
                        <div >Create Survey</div>
                    </Link>
                </div>
            </div>

        </div>
    )

}

export default LeftSideBar;