import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createPortal} from "react-dom";
import {addUser, removeUser} from "../storage/usersReducer";
import style from "../styles/popup.module.scss";
import {TInputValidation, TPopup} from "../storage/types";

const Popup = ({isOldUser, propsUser, onClose}: TPopup) => {
  const [user, setUser] = useState(propsUser);
  const [inputValidation, setInputValidation] = useState<TInputValidation>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
  });

  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({...user, firstName: e.target.value});
  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({...user, lastName: e.target.value});
  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({...user, email: e.target.value});
  const setRole = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUser({...user, role: e.target.value});

  const dispatch = useDispatch();

  const addUserToList = () => {
    let validation = {
      firstName: user.firstName.length < 2,
      lastName: user.lastName.length < 2,
      email: user.email.length < 5,
    };
    setInputValidation(validation);
    for (const [, value] of Object.entries(validation)) {
      if (!value) {
        return;
      }
    }
    dispatch(addUser(user));
    onClose();
  };
  const removeUserFromList = () => {
    dispatch(removeUser(user.id));
    onClose();
  };

  return createPortal(
    <>
      <div className={style.blackout} onClick={onClose} />
      <div className={style.form}>
        <input
          className={inputValidation.firstName === false ? "error" : ""}
          placeholder={"First name"}
          value={user.firstName}
          onChange={setFirstName}
        />
        <input
          className={inputValidation.lastName === false ? "error" : ""}
          placeholder={"Last name"}
          value={user.lastName}
          onChange={setLastName}
        />
        <input
          className={inputValidation.email === false ? "error" : ""}
          placeholder={"Email"}
          value={user.email}
          onChange={setEmail}
        />
        <select value={user.role} onChange={setRole}>
          <option value={"user"}>User</option>
          <option value={"editor"}>Editor</option>
          <option value={"admin"}>Admin</option>
        </select>
        <button className="button-primary" onClick={addUserToList}>
          save
        </button>
        {isOldUser && (
          <button className="button-primary" onClick={removeUserFromList}>
            delete
          </button>
        )}
        <button className="button-secondary" onClick={onClose}>
          cancel
        </button>
      </div>
    </>,
    document.getElementById("popup")!
  );
};

export default Popup;