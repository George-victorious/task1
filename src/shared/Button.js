import styled from "styled-components";

const Button = styled.button`
  padding: 5px 15px;
  border: 0;
  border-radius: 25px;
  background-color: ${(props) => (props.uncommon ? "#c3c9cc" : "#3b49d1")};
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.uncommon ? "#a8b2b6" : "#2936b3")};
  }

  &:active {
    background-color: ${(props) => (props.uncommon ? "#8e9a9f" : "#202a8b")};
  }
`;

export default Button;
