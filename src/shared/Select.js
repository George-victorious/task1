import styled from "styled-components";

const Select = styled.select`
  padding: 5px 15px;
  border: 1px solid #a8b2b6;
  border-radius: 25px;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    border-color: #3b49d1;
  }
`;

export default Select;
