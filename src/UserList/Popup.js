import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {createPortal} from "react-dom";
import { addUser } from "../storage/usersReducer";

const Popup = ({ propsUser, onClose }) => {
  const [user, setUser] = useState(propsUser);

  const setFirstName = e => setUser({...user, firstName: e.target.value});
  const setLastName = e => setUser({...user, lastName: e.target.value});
  const setEmail = e => setUser({...user, email: e.target.value});
  const setRole = e => setUser({...user, role: e.target.value});

  const dispatch = useDispatch();

  const addUserToList = () => {
    dispatch(addUser(user));
    onClose();
  }

  return createPortal(
    <>
      <GrayBg onClick={onClose} />
      <Form>
        <input placeholder={'First name'} value={user.firstName} onChange={setFirstName} />
        <input placeholder={'Last name'} value={user.lastName} onChange={setLastName} />
        <input placeholder={'Email'} value={user.email} onChange={setEmail} />
        <select value={user.role} onChange={setRole} >
          <option value={'user'}>User</option>
          <option value={'editor'}>Editor</option>
          <option value={'admin'}>Admin</option>
        </select>
        <button onClick={addUserToList} >save</button>
        <button onClick={onClose} >close</button>
      </Form>
    </>
  ,document.getElementById('popup'));
};

const GrayBg = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const Form = styled.div`
  width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

export default Popup;
