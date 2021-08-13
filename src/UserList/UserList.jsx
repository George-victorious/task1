import React, {useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import Popup from "./Popup";
import Typography from "../shared/Typotraphy";
import Button from "../shared/Button";

const UserList = () => {
  const emptyUser = {
    id: new Date().getTime(),
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  };

  const userList = useSelector((state) => state.users.userList);

  const [popupUser, setPopupUser] = useState(null);
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
        userList.map((user, index) => (
          <UserRow key={user.email} uneven={index % 2} onClick={() => setPopupUser(user)}>
            <Typography level={"h3"}>{user.firstName + " " + user.lastName}</Typography>
            <Typography level={"p"}>{user.email}</Typography>
            <Typography level={"p"}>{user.role}</Typography>
          </UserRow>
        ))
      ) : (
        <Typography
          level={"p"}
          style={{padding: "20px", textAlign: "center", backgroundColor: "#E2DCE5"}}
        >
          No users yet.
        </Typography>
      )}
      <Button onClick={openPopup} style={{marginTop: "20px"}}>
        Add user
      </Button>
      {popupUser && (
        <Popup isOldUser={isOldUser} propsUser={popupUser} onClose={closePopup} />
      )}
    </>
  );
};

const UserRow = styled.div`
  padding: 10px;
  display: flex;
  background-color: ${(props) => (props.uneven ? "#E2DCE5" : "#B2A2B9")};
  border-top: 1px solid black;

  &:first-child {
    border: 0;
  }

  & :nth-child(n) {
    width: 33.333%;
    text-align: center;
    border-left: 1px solid black;
  }
  & :first-child {
    border: 0;
  }
`;

export default UserList;
