import React from "react";
import styles from "../../app/general.module.scss";
import HeaderOperator from "./HeaderOperator";
import HeaderClient from "./HeaderClient";
import HeaderAdmin from "./HeaderAdmin";

const Header = ({ isLoggedIn, color, isPosition }) => {
  return (
    <div className={styles.header}>
      {isPosition === "admin" && (
        <HeaderAdmin isLoggedIn={isLoggedIn} color={color} />
      )}
      {isPosition === "operator" && (
        <HeaderOperator isLoggedIn={isLoggedIn} color={color} />
      )}
      {isPosition === "client" && (
        <HeaderClient isLoggedIn={isLoggedIn} color={color} />
      )}
    </div>
  );
};
export default Header;
