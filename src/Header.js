import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import Typography from "./shared/Typotraphy";

const HeaderComponent = () => {
  return (
    <Header>
      <StyledLink to={"/"}>
        <Typography level={"h2"} children={"LeverX"} />
      </StyledLink>
      <Pagination>
        <ChangePageButton exact to={"/"}>
          Home
        </ChangePageButton>
        <ChangePageButton exact to={"/users"}>
          Users
        </ChangePageButton>
      </Pagination>
    </Header>
  );
};

const Header = styled.div`
  height: 70px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #3b49d1;
`;

const Pagination = styled.div`
  display: flex;
  gap: 20px;
`;

const ChangePageButton = styled(NavLink)`
  padding: 15px;
  display: flex;
  align-items: center;
  color: #fff;
  transition: 0.3s;
  text-decoration: none;

  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
`;

export default HeaderComponent;
