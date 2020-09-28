import React from "react";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../../datalayer/StateProvider";

function Header() {
  const [{ role }, dispatch] = useStateValue();
  const onClickHandler = (e) => {
    dispatch({ type: "REMOVE_ROLE" });
  };
  return (
    <div className="header">
      <div className="header__logo">
        <p>QUBIT REACT TASK</p>
      </div>
      <div className="header__right">
        <div className="header__login">
          <Link to="/login">
            {role ? <p onClick={onClickHandler}>Logout</p> : <p>Login</p>}
          </Link>
        </div>
        {role == "view" && (
          <div
            className={`header__viewmode ${role == "view" && "highlight_icon"}`}
          >
            <IconButton>
              <RemoveRedEyeIcon />
            </IconButton>
          </div>
        )}
        {role == "admin" && (
          <div
            className={`header__edit ${role == "admin" && "highlight_icon"}`}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
