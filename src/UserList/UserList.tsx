import React, {useState} from "react";
import {useSelector} from "react-redux";
import Popup from "./Popup";
import Typography from "../shared/Typotraphy";
import "../styles/userList.scss";
import {TUser} from "../storage/types";
import {getUserList} from "../storage/selectors";
import Typogr from "../shared/newTypography";
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
          <div className="user-row" key={user.email} onClick={() => setPopupUser(user)}>
            <Typogr.XMedium>{user.firstName + " " + user.lastName}</Typogr.XMedium>
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
