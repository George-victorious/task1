import {Link, NavLink} from "react-router-dom";
import Typography from "./shared/Typotraphy";
import "./styles/header.scss";

const HeaderComponent = () => {
  return (
    <div className="header">
      <Link className="link" to={"/"}>
        <Typography level={"h2"} children={"LeverX"} />
      </Link>
      <div className="pagination">
        <NavLink className="styledNavLink" exact to={"/"}>
          Home
        </NavLink>
        <NavLink className="styledNavLink" exact to={"/users"}>
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderComponent;
