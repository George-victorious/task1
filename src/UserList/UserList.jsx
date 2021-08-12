import React, {useState} from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import Popup from "./Popup";

const UserList = () => {

  const emptyUser = {
    id: new Date().getTime(),
    firstName: '',
    lastName: '',
    email: '',
    role: 'user'
  };

  const userList = useSelector(state => state.users.userList);

  const [popupUser,setPopupUser] = useState(null);
  const [isOldUser,setIsOldUser] = useState(true);

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
      {userList.length
        ? userList.map((user, index) => (
          <UserRow key={user.email} uneven={index % 2} onClick={()=>setPopupUser(user)}>
            <h3>{user.firstName + ' ' + user.lastName}</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </UserRow>
        ))
        : <div>No users yet.</div>
      }
      <button onClick={openPopup}>Add user</button>
      {
        popupUser && <Popup isOldUser={isOldUser} propsUser={popupUser} onClose={closePopup} />
      }
    </>
  );
};

const UserRow = styled.div`
  padding: 10px;
  display: flex;
  background-color: ${props => props.uneven ? '#E2DCE5' : '#B2A2B9'};
  border-top: 1px solid black;

  &:first-child {
    border: 0;
  }
  
  & :nth-child(n) {
    text-align: center;
    width: 33.333%;
  }
  & :nth-child(2) {
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
`;

export default UserList;
