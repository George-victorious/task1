import React, {useState} from "react";
import {useSelector} from "react-redux";
import Popup from "./Popup";
import Typography from "../shared/Typotraphy";
import style from "../styles/userList.module.scss";
import {TUser} from "../storage/types";
import {getUserList} from "../storage/selectors";

const UserList = () => {
  const emptyUser = {
    id: new Date().getTime(),
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  };

  const userList = useSelector(getUserList);

  const [popupUser, setPopupUser] = useState<typeof emptyUser | null>(null);
  const [isOldUser, setIsOldUser] = useState(true);

  const openPopup = () => {
    setPopupUser(emptyUser);
    setIsOldUser(false);
  };
  const closePopup = () => {
    setPopupUser(null);
    setIsOldUser(true);
  };

  return (
    <>
      {userList.length ? (
        userList.map((user: TUser, index: number) => (
          <div
            className={style["user-row"]}
            key={user.email}
            onClick={() => setPopupUser(user)}
          >
            <Typography level={"h3"}>{user.firstName + " " + user.lastName}</Typography>
            <Typography level={"p"}>{user.email}</Typography>
            <Typography level={"p"}>{user.role}</Typography>
          </div>
        ))
      ) : (
        <Typography
          level={"p"}
          style={{padding: "20px", textAlign: "center", backgroundColor: "#E2DCE5"}}
        >
          No users yet.
        </Typography>
      )}
      <button className="button-primary" onClick={openPopup} style={{marginTop: "20px"}}>
        Add user
      </button>
      {popupUser && (
        <Popup isOldUser={isOldUser} propsUser={popupUser} onClose={closePopup} />
      )}
    </>
  );
};

export default UserList;
