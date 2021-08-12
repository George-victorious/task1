import React, {useState} from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import Popup from "./Popup";

const UserList = () => {
  const userList = useSelector(state => state.users.userList);

  const [popupUser,setPopupUser] = useState(null);

  const emptyUser = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'user'
  }

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
          <button onClick={()=>setPopupUser(emptyUser)}>Add user</button>
          {
            popupUser && <Popup propsUser={popupUser} onClose={()=>setPopupUser(null)} />
          }
        </>
    );
};

const UserRow = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.uneven ? '#E2DCE5' : '#B2A2B9'};
`;

export default UserList;
