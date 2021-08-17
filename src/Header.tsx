import {Link, NavLink} from "react-router-dom";
import Typography from "./shared/Typotraphy";
import style from "./styles/header.module.scss";

const HeaderComponent = () => {
  return (
    <div className={style.header}>
      <Link className={style.link} to={"/"}>
        <Typography level={"h2"} children={"LeverX"} />
      </Link>
      <div className={style.pagination}>
        <NavLink className={style.styledNavLink} exact to={"/"}>
          Home
        </NavLink>
        <NavLink className={style.styledNavLink} exact to={"/users"}>
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderComponent;
